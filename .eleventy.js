const { minify } = require("terser");
const { chunk } = require("lodash");
const to = require('await-to-js').default;

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

    eleventyConfig.addCollection("categoryIndex", async function(collection) {
        return createTaxonomyCollections(collection, 'category');
    });
    eleventyConfig.addCollection("tagIndex", function(collection) {
        return createTaxonomyCollections(collection, 'tag');
    });

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
