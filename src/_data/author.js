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
`;

const getData = async () => {
    let asset = new AssetCache("author");
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
    const author = {
        ...data.data.data.user,
        description: (data?.data?.data?.user?.description || '').split('\n')
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
}

module.exports = getData();


