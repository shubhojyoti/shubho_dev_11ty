const axios = require('axios');
const to = require('await-to-js').default;
require('dotenv').config();

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const { AssetCache } = require("@11ty/eleventy-cache-assets");
const highlightCode = require('./highlight-code');
const updateLazyImageTags = require('./lazy-image-tags');
const getImageList = require('./get-image-list');

const TZ = process.env.TZ || 'UTC';
const WP_URL = process.env.WP_URL || 'https://notfoundsomething.com';
const WP_USER = process.env.WP_USER || '';
const WP_PWD = process.env.WP_PASSWORD || '';

const postDateFormatString = 'MMM DD, YYYY';
const postDateFormat = 'YYYY-MM-DD';
const postDateStdFormat = 'YYYY-MM-DDTHH:mm:ss'
const postDateRssFormat = 'ddd, DD MMM YYYY HH:mm:ss'

const headers = {
    'Content-Type': 'application/json'
};
if (WP_USER !== '' && WP_PWD !== '') {
    headers.Authorization = `Basic ${Buffer.from(`${WP_USER}:${WP_PWD}`).toString('base64')}`;
}

const queries = {
    allPosts: (next_cursor = '') => `
query posts {
  posts(where: {orderby: {field: DATE, order: DESC}}, first: 50${next_cursor !== '' ? ', after: "' + next_cursor + '"' : ''}) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      slug
      title
      uri
      date
      modified
      readingTime
      featuredImage {
        node {
          imageExtras {
            author
            authorLink
            photoProvider
            providerUrl
          }
          uri
          title
          altText
          mediaItemUrl
          mediaDetails {
            sizes {
              width
              height
              sourceUrl
            }
          }
        }
      }
      categories {
        nodes {
          name
          uri
          slug
        }
      }
      tags {
        nodes {
          name
          uri
          slug
        }
      }
      excerpt
      content
    }
  }
}
`,

    allPages: (next_cursor = '') => `
query pages {
  pages(where: {orderby: {field: DATE, order: DESC}}, first: 50${next_cursor !== '' ? ', after: "' + next_cursor + '"' : ''}) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      slug
      title
      uri
      date
      modified
      featuredImage {
        node {
          imageExtras {
            author
            authorLink
            photoProvider
            providerUrl
          }
          uri
          title
          altText
          mediaItemUrl
          mediaDetails {
            sizes {
              width
              height
              sourceUrl
            }
          }
        }
      }
      content
    }
  }
}
`,

    author: () => `
query user {
  user(id: "1", idType: DATABASE_ID) {
    firstName
    lastName
    description
    socialHandles {
      devto
      email
      github
      linkedin
      twitter
    }
  }
}
`,

    taxonomy: () => `
query posts {
  categories(where: {hideEmpty: true}) {
    nodes {
      uri
      count
      name
      slug
      posts(where: {orderby: {field: DATE, order: DESC}}, first: 1) {
        nodes {
          title
          modified
        }
      }
    }
  }
  tags(where: {hideEmpty: true}) {
    nodes {
      uri
      count
      name
      slug
      posts(where: {orderby: {field: DATE, order: DESC}}, first: 1) {
        nodes {
          title
          modified
        }
      }
    }
  }
}
`,
}

const getData = async (query) => axios({
    url: `${WP_URL}/graphql`,
    method: 'post',
    headers,
    data: { query }
})
    .then((data) => {
        // console.log(JSON.stringify(data.data));
        return data.data;
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });

const getAllPosts = async () => {
    let asset = new AssetCache("all_posts");
    if(asset.isCacheValid("1d")) {
        // return cached data.
        return asset.getCachedValue();
    }

    let hasNextPage = true;
    let nextCursor = '';
    let count = 1;
    const postsData = [];
    while (hasNextPage) {
        console.log('Running count', count);
        const query = queries.allPosts(nextCursor);
        const [err, data] = await to(getData(query));
        if (err) {
            throw err;
        }
        if (data?.data?.posts?.pageInfo?.hasNextPage === undefined ||
            data?.data?.posts?.pageInfo?.endCursor === undefined ||
            (data?.data?.posts?.nodes || []).length === 0) {
            throw new Error('No data found');
        }
        postsData.push(...data.data.posts.nodes.map((node) => {
            let metaDescription = node.excerpt.replace(
                /(<([^>]+)>)/gi,
                ""
            );
            metaDescription = metaDescription
                .replace("\n", "")
                .replace("[&hellip;]", "...")
                .replace(". ...", ".");
            const imageList = getImageList(node.content, node.featuredImage || null);
            let content = highlightCode(node.content);
            content = updateLazyImageTags(content);
            // Make relative URLs absolute (would work otherwise on the site, but not in the feed)
            content = content.replace(
                'href="/',
                'href="https://www.shubho.dev/'
            );
            return {
                ...node,
                imageList,
                postDate: dayjs.utc(node.date).tz(TZ).format(postDateFormatString),
                postDateUtc: dayjs.utc(node.date).format(postDateStdFormat),
                ogPostDateIst: `${node.date}.000+05:30`,
                ldPostDate: dayjs.utc(node.date).tz(TZ).format(postDateFormat),
                rssPostDate: `${dayjs.utc(node.date).tz('GMT').format(postDateRssFormat)} GMT`,
                modifiedDate: dayjs.utc(node.modified).tz(TZ).format(postDateFormatString),
                modifiedDateUtc: dayjs.utc(node.modified).format(postDateStdFormat),
                ogModifiedDateIst: `${node.modified}.000+05:30`,
                ldModifiedDate: dayjs.utc(node.modified).tz(TZ).format(postDateFormat),
                last_mod: `${dayjs.utc(node.modified).format(postDateStdFormat)}+00:00`,
                content,
                metaDescription,
                category: node.categories.nodes.map(cat => cat.name),
                tag: node.tags.nodes.map(tag => tag.name),
                categoryString: node.categories.nodes.map(cat => cat.name).join(', '),
                tagString: node.tags.nodes.map(tag => tag.name).join(', '),
                categoryStringSpace: node.categories.nodes.map(cat => cat.name).join(' '),
                tagStringSpace: node.tags.nodes.map(tags => tags.name).join(' '),
                keywords: [...node.categories.nodes, ...node.tags.nodes].map(cat => cat.name).join(', ')
            };
        }));
        nextCursor = data.data.posts.pageInfo.endCursor;
        hasNextPage = data.data.posts.pageInfo.hasNextPage;
        count++;
    }
    console.log('WordPress - Retrieved', postsData.length, 'posts');
    await asset.save(postsData, 'json');
    return postsData;
};

const getAllPages = async () => {
    let asset = new AssetCache("all_pages");
    if(asset.isCacheValid("1d")) {
        // return cached data.
        return asset.getCachedValue();
    }

    let hasNextPage = true;
    let nextCursor = '';
    let count = 1;
    const pagesData = [];
    while (hasNextPage) {
        console.log('Running count', count);
        const query = queries.allPages(nextCursor);
        const [err, data] = await to(getData(query));
        if (err) {
            throw err;
        }
        if (data?.data?.pages?.pageInfo?.hasNextPage === undefined ||
            data?.data?.pages?.pageInfo?.endCursor === undefined ||
            (data?.data?.pages?.nodes || []).length === 0) {
            throw new Error('No data found');
        }
        pagesData.push(...data.data.pages.nodes.map((node) => {
            const excerpt = `${node.content.slice(0, 340)}...`;
            let metaDescription = excerpt.replace(
                /(<([^>]+)>)/gi,
                ""
            );
            metaDescription = metaDescription
                .replace("\n", "")
                .replace("[&hellip;]", "...")
                .replace(". ...", ".");
            const imageList = getImageList(node.content, node.featuredImage || null);
            let content = highlightCode(node.content);
            content = updateLazyImageTags(content);
            // Make relative URLs absolute (would work otherwise on the site, but not in the feed)
            content = content.replace(
                'href="/',
                'href="https://www.shubho.dev/'
            );

            return {
                ...node,
                excerpt,
                imageList,
                postDate: dayjs.utc(node.date).tz(TZ).format(postDateFormatString),
                postDateUtc: dayjs.utc(node.date).format(postDateStdFormat),
                ogPostDateIst: `${node.date}.000+05:30`,
                ldPostDate: dayjs.utc(node.date).tz(TZ).format(postDateFormat),
                modifiedDate: dayjs.utc(node.modified).tz(TZ).format(postDateFormatString),
                modifiedDateUtc: dayjs.utc(node.modified).format(postDateStdFormat),
                ogModifiedDateIst: `${node.modified}.000+05:30`,
                ldModifiedDate: dayjs.utc(node.modified).tz(TZ).format(postDateFormat),
                last_mod: `${dayjs.utc(node.modified).format(postDateStdFormat)}+00:00`,
                content,
                metaDescription,
            };
        }));
        nextCursor = data.data.pages.pageInfo.endCursor;
        hasNextPage = data.data.pages.pageInfo.hasNextPage;
        count++;
    }
    console.log('WordPress - Retrieved', pagesData.length, 'pages');
    await asset.save(pagesData, 'json');
    return pagesData;
};

const getAuthorData = async () => {
    let asset = new AssetCache("author");
    if(asset.isCacheValid("1d")) {
        // return cached data.
        return asset.getCachedValue();
    }
    const [err, data] = await to(getData(queries.author()));
    if (err) {
        throw err;
    }
    const author = {
        ...data.data.user,
        description: (data?.data?.user?.description || '').split('\n')
    };
    if (author.firstName && author.firstName !== '') {
        console.log('WordPress - Received author First Name');
    }
    if (author.lastName && author.lastName !== '') {
        console.log('WordPress - Received author Last Name');
    }
    if (author.description && author.description.length > 0) {
        console.log('WordPress - Received author description');
    }
    if (author.socialHandles && Object.keys(author.socialHandles).length > 0) {
        console.log('WordPress - Received author social handles', Object.keys(author.socialHandles).length);
    }
    await asset.save(author, 'json');
    return author;
};

const getTaxonomyData = async () => {
    let asset = new AssetCache("taxonomy");
    if(asset.isCacheValid("1d")) {
        // return cached data.
        return asset.getCachedValue();
    }
    const [err, data] = await to(getData(queries.taxonomy()));
    if (err) {
        throw err;
    }
    const categories = data?.data?.categories?.nodes.map((categoryNode) => ({
        ...categoryNode,
        last_mod: `${dayjs.utc(categoryNode.posts.nodes[0].modified).format(postDateStdFormat)}+00:00`
    })) || [];
    console.log('WordPress - Retrieved', categories.length, 'categories');
    const tags = data?.data?.tags?.nodes.map((tagNode) => ({
        ...tagNode,
        last_mod: `${dayjs.utc(tagNode.posts.nodes[0].modified).format(postDateStdFormat)}+00:00`
    })) || [];
    console.log('WordPress - Retrieved', tags.length, 'tags');
    const output = { categories, tags };
    await asset.save(output, 'json');
    return output;
};

module.exports = {
    posts: getAllPosts(),
    pages: getAllPages(),
    author: getAuthorData(),
    taxonomies: getTaxonomyData()
};
