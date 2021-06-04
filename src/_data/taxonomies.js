const axios = require('axios');
const to = require('await-to-js').default;
require('dotenv').config();
const { AssetCache } = require("@11ty/eleventy-cache-assets");

const WP_URL = process.env.WP_URL || 'https://notfoundsomething.com';
const WP_USER = process.env.WP_USER || '';
const WP_PWD = process.env.WP_PASSWORD || '';

const headers = {
    'Content-Type': 'application/json'
};
if (WP_USER !== '' && WP_PWD !== '') {
    headers.Authorization = `Basic ${Buffer.from(`${WP_USER}:${WP_PWD}`).toString('base64')}`;
}

const getQuery = () => `
query posts {
  categories(where: {hideEmpty: true}) {
    nodes {
      uri
      count
      name
      slug
    }
  }
  tags(where: {hideEmpty: true}) {
    nodes {
      uri
      count
      name
      slug
    }
  }
}
`;

const getData = async () => {
    let asset = new AssetCache("taxonomy");
    if(asset.isCacheValid("1d")) {
        // return cached data.
        return asset.getCachedValue();
    }
    const [err, data] = await to(axios({
        url: `${WP_URL}/graphql`,
        method: 'post',
        headers,
        data: { query: getQuery() }
    }));
    if (err) {
        throw err;
    }
    const categories = data.data?.data?.categories?.nodes || [];
    console.log('WordPress - Retrieved', categories.length, 'categories');
    const tags = data.data?.data?.tags?.nodes || [];
    console.log('WordPress - Retrieved', tags.length, 'tags');
    const output = { categories, tags };
    await asset.save(output, 'json');
    return output;
}

module.exports = getData();
