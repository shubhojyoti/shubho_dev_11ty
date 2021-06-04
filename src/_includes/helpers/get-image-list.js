const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (content, featuredImage) => {
    const postImages = [];
    const dom = new JSDOM(content);
    const figureElems = dom.window.document.querySelectorAll("figure");
    figureElems.forEach((figure) => {
        const captionElem = figure.querySelector('figcaption');
        const imgElem = figure.querySelector('img');
        const imgObj = {
            location: imgElem.getAttribute('src'),
            caption: captionElem.innerHTML,
            title: captionElem.innerHTML
        };
        postImages.push(imgObj);
    });
    if (featuredImage && featuredImage.node) {
        const imgObj = {
            location: featuredImage.node.mediaDetails.sizes
                .filter((imgs) => imgs.width.toString() === '425' && imgs.height.toString() === '255')[0]
                .sourceUrl,
            caption: featuredImage.node.title,
            title: featuredImage.node.title,
        };
        postImages.push(imgObj);
    }
    console.log(JSON.stringify(postImages, null, 2));
    return postImages;
};
