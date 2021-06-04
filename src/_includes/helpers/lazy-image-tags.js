const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (content) => {
    const dom = new JSDOM(content);
    const figureImgElems = dom.window.document.querySelectorAll("figure > img");
    if (figureImgElems.length) {
        figureImgElems.forEach((elem) => {
            const srcAttr = elem.getAttribute('src');
            if (srcAttr) {
                elem.setAttribute('data-src', srcAttr);
                elem.removeAttribute('src');
            }
            const srcSetAttr = elem.getAttribute('srcset');
            if (srcSetAttr) {
                elem.setAttribute('data-srcset', srcSetAttr);
                elem.removeAttribute('srcset');
            }
            const sizesAttr = elem.getAttribute('sizes');
            if (sizesAttr) {
                elem.setAttribute('data-sizes', sizesAttr);
            } else {
                elem.setAttribute('data-sizes', 'auto');
            }
            elem.removeAttribute('sizes');
            if (!elem.classList.contains('lazyload')) {
                elem.classList.add('lazyload');
            }
            elem.removeAttribute('loading');
        });
        content = dom.window.document.body.innerHTML;
    }
    return content;
};
