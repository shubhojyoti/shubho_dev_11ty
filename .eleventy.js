const { minify } = require("terser");
const { chunk } = require("lodash");
const to = require('await-to-js').default;
const xmlEscape = require('xml-escape');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
const last_mod = dayjs.utc().format('YYYY-MM-DDTHH:mm:ss+00:00');

function getListPageTitle(type, page, pagination, taxonomy) {
    const totalCount = taxonomy ? taxonomy.pagination.totalNumber : pagination.hrefs.length;
    const currentPage = taxonomy ? taxonomy.pagination.pageNumber : Number(pagination.pageNumber) + 1;
    let pageTitle = 'Latest Posts';
    const normalizedType = type.toString().toLowerCase();
    if (normalizedType === 'category') {
        if (page.url.includes('/category/') && page.url.includes('/page-')) {
            pageTitle = `Posts filed under "${taxonomy.taxName}" - Page ${currentPage} of ${totalCount}`;
        } else {
            pageTitle = `Posts filed under "${taxonomy.taxName}"`;
        }
    } else if (normalizedType === 'tag') {
        if (page.url.includes('/tag/') && page.url.includes('/page-')) {
            pageTitle = `Posts tagged as "${taxonomy.taxName}" - Page ${currentPage} of ${totalCount}`;
        } else {
            pageTitle = `Posts tagged as "${taxonomy.taxName}"`;
        }
    } else {
        if (page.url.includes('/blog/page-')) {
            pageTitle = `Latest Posts - Page ${currentPage} of ${totalCount}`;
        }
    }
    return pageTitle;
}

async function createTaxonomyCollections(collection, type = 'category') {
    const [_err1, posts] = await to(require("./src/_data/posts"));
    const [_err2, taxonomies] = await to(require("./src/_data/taxonomies"));
    let taxSet = new Set();
    posts.map(function(item) {
        if( type in item ) {
            let taxList = item[type];
            for (let tax of taxList) {
                taxSet.add(tax);
            }
        }
    });
    const taxKey = type === 'category' ? 'categories' : 'tags';

    let paginationSize = 10;
    let taxMap = [];
    let taxArray = [...taxSet];
    for( let taxName of taxArray) {
        let taxItems = posts.filter(coll => coll[type].indexOf(taxName) > -1);
        let pagedItems = chunk(taxItems, paginationSize);
        for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
            const currentPage = pageNumber + 1;
            const taxSlug = taxonomies[taxKey].filter(tax => tax.name === taxName)[0].slug;
            const urlRoot = `/${type}/${taxSlug}`;
            taxMap.push({
                taxName,
                taxSlug,
                pagination: {
                    pageNumber: currentPage,
                    totalNumber: max,
                    pageUrl: `${urlRoot}${currentPage > 1 ? '/page-' + currentPage : ''}/`,
                    previousPageUrl: currentPage > 1 && currentPage <= max
                        ? currentPage - 1 === 1
                            ? `${urlRoot}/`
                            : `${urlRoot}/page-${Number(currentPage) - 1}/`
                        : '',
                    nextPageUrl: currentPage >= 1 && currentPage < max
                        ? currentPage === max
                            ? ''
                            : `${urlRoot}/page-${Number(currentPage) + 1}/`
                        : ''
                },
                pageData: pagedItems[pageNumber]
            });
        }
    }
    return taxMap;
}

function getBlogListUrls(posts, siteUrl) {
    const allBlogPages = [];
    const pageCount = 10;
    const numberOfPages = Math.ceil(posts.length / pageCount);
    for (let i = 1; i <= numberOfPages; i++) {
        if (i === 1) {
            allBlogPages.push({
                last_mod,
                fullUrl: `${siteUrl}/blog/`,
                type: 'list',
            });
        } else {
            allBlogPages.push({
                last_mod,
                fullUrl: `${siteUrl}/blog/page-${i}/`,
                type: 'list',
            });
        }
    }
    return allBlogPages;
}

function getCategoryListUrls(posts, categoryObj, siteUrl) {
    const allCategoryPages = [];
    const pageCount = 10;
    const matchedPosts = posts.filter(post => post.category.indexOf(categoryObj.name) > -1);
    if (matchedPosts.length === 0) {
        return allCategoryPages;
    }
    const numberOfPages = Math.ceil(matchedPosts.length / pageCount);
    for (let i = 1; i <= numberOfPages; i++) {
        if (i === 1) {
            allCategoryPages.push({
                ...categoryObj,
                fullUrl: `${siteUrl}/category/${categoryObj.slug}/`,
                type: 'category',
            });
        } else {
            allCategoryPages.push({
                ...categoryObj,
                fullUrl: `${siteUrl}/category/${categoryObj.slug}/page-${i}/`,
                type: 'category',
            });
        }
    }
    return allCategoryPages;
}

function getTagListUrls(posts, tagObj, siteUrl) {
    const allTagPages = [];
    const pageCount = 10;
    const matchedPosts = posts.filter(post => post.tag.indexOf(tagObj.name) > -1);
    if (matchedPosts.length === 0) {
        return allTagPages;
    }
    const numberOfPages = Math.ceil(matchedPosts.length / pageCount);
    for (let i = 1; i <= numberOfPages; i++) {
        if (i === 1) {
            allTagPages.push({
                ...tagObj,
                fullUrl: `${siteUrl}/tag/${tagObj.slug}/`,
                type: 'tag',
            });
        } else {
            allTagPages.push({
                ...tagObj,
                fullUrl: `${siteUrl}/tag/${tagObj.slug}/page-${i}/`,
                type: 'tag',
            });
        }
    }
    return allTagPages;
}

async function createAllCollection() {
    const [err, [metadata, posts, pages, { categories, tags }]] = await to(Promise.all([
        require('./src/_data/metadata'),
        require('./src/_data/posts'),
        require('./src/_data/pages'),
        require('./src/_data/taxonomies'),
    ]));
    const allData = [];
    allData.push({
        last_mod,
        fullUrl: metadata().siteUrl,
        type: 'home',
    });
    allData.push(...pages.map((page) => ({
        ...page,
        fullUrl: `${metadata().siteUrl}${page.uri}`,
        type: 'page'
    })));
    allData.push(...posts.map((post) => ({
        ...post,
        fullUrl: `${metadata().siteUrl}${post.uri}`,
        type: 'post'
    })));
    categories.forEach((category) => {
        allData.push(...getCategoryListUrls(posts, category, metadata().siteUrl));
    });
    tags.forEach((tag) => {
        allData.push(...getTagListUrls(posts, tag, metadata().siteUrl));
    });
    allData.push(...getBlogListUrls(posts, metadata().siteUrl));
    // console.log(JSON.stringify(allData, null, 2));
    return allData;
}

function getFeaturedImageBySize(featuredImage, width, height) {
    const images = featuredImage?.node?.mediaDetails?.sizes || [];
    if (images.length === 0) {
        return '';
    }
    const matchedImg = images.filter(img => img.width.toString() === width.toString() && img.height.toString() === height.toString());
    if (matchedImg.length === 0) {
        return '';
    }
    return matchedImg[0].sourceUrl;
}

module.exports = (eleventyConfig) => {
    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, cb) {
        try {
            const minified = await minify(code);
            cb(null, minified.code);
        } catch (err) {
            console.error("Terser error: ", err);
            cb(null, code);
        }
    });

    eleventyConfig.addFilter("listPageTitle", getListPageTitle);
    eleventyConfig.addFilter("concatString", function(first, second, separator = '') {
        return `${first}${separator}${second}`;
    });
    eleventyConfig.addFilter("getFeaturedImageBySize", getFeaturedImageBySize);
    eleventyConfig.addFilter("escapeXml", function(data) {
        return xmlEscape(data);
    });
    eleventyConfig.addFilter("escapeQuotes", function(data) {
        return data.replace('"', '\\"');
    });
    eleventyConfig.addFilter("stringify", function(data) {
        return JSON.stringify(data);
    });

    eleventyConfig.addCollection("categoryIndex", async function(collection) {
        return createTaxonomyCollections(collection, 'category');
    });
    eleventyConfig.addCollection("tagIndex", function(collection) {
        return createTaxonomyCollections(collection, 'tag');
    });
    eleventyConfig.addCollection("allUrls", function() {
        return createAllCollection();
    });

    eleventyConfig.addPassthroughCopy({ "./src/static": "/assets" });
    eleventyConfig.addPassthroughCopy({ "./src/images": "/assets/images" });
    eleventyConfig.addPassthroughCopy({ "./src/_tmp": "/assets" });
    eleventyConfig.addWatchTarget('./src/_tmp');

    eleventyConfig.setBrowserSyncConfig({
        ui: false,
        ghostMode: false
    });

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid",
            "11ty.js"
        ],
        pathPrefix: "/",
        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        dir: {
            input: 'src',
            output: 'dist'
        },
    };
};
