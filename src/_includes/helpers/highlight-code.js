const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const highlightLineRange = require('gatsby-remark-prismjs/directives');

const Prism = require("prismjs");
const loadLanguages = require('prismjs/components/index.js');
loadLanguages(['python', 'tcl', 'yaml', 'php', 'markup', 'css', 'javascript', 'bash', 'jsx']);

// https://martinschneider.me/articles/building-a-website-with-11ty-and-wordpress/
module.exports = (content) => {
    const dom = new JSDOM(content);
    const codeElems = dom.window.document.querySelectorAll("code");
    if (codeElems.length) {
        codeElems.forEach((elem) => {
            const codeClass = elem.className;
            let language = 'text';
            let matches = codeClass.match(/language-(.*)/);
            if (matches != null) {
                language = matches[1];
            }
            const parentElemName = elem.parentElement?.nodeName?.toLowerCase() || 'no_valid_element';
            if (parentElemName !== 'pre') {
                let elemContent = elem.innerHTML;
                const inlineMatches = elemContent.match(/([A-Za-z]+)&gt;&gt;(.*$)/);
                if (inlineMatches !== null) {
                    language = inlineMatches[1];
                    elemContent = inlineMatches[2];
                    elem.innerHTML = elemContent;
                }
            }

            let prismGrammar = Prism.languages.markup;
            if (['javascript', 'js', 'json'].indexOf(language.toLowerCase()) > -1) {
                prismGrammar = Prism.languages.javascript;
            } else if (language === 'css') {
                prismGrammar = Prism.languages.css;
            } else if (language === 'php') {
                prismGrammar = Prism.languages.php;
            } else if (['html', 'xml', 'markup'].indexOf(language.toLowerCase()) === -1) {
                prismGrammar = Prism.languages.markup;
            } else {
                const lang = Object.keys(Prism.languages);
                const idx = lang.indexOf(language.toLowerCase());
                if (idx > -1) {
                    prismGrammar = Prism.languages[lang[idx]];
                }
            }
            elem.innerHTML = Prism.highlight(
                elem.textContent,
                prismGrammar,
                language
            );
            const newClassName = `language-${language}`;
            if (!elem.classList.contains(newClassName)) {
                elem.classList.add(newClassName);
            }
            if (parentElemName === 'pre') {
                const preElement = elem.parentElement;
                if (!preElement.classList.contains(newClassName)) {
                    preElement.classList.add(newClassName);
                }
                const codeDiv = dom.window.document.createElement('div');
                codeDiv.classList.add('code-highlight');
                codeDiv.setAttribute('data-language', language);
                const syntaxDiv = dom.window.document.createElement('div');
                syntaxDiv.classList.add('syntax-lang-name');
                syntaxDiv.innerHTML = `<div class="hide-for-non-sr">Following code snippet is written in </div>${language}`;
                codeDiv.appendChild(syntaxDiv);
                preElement.parentNode.insertBefore(codeDiv, preElement.nextSibling);
                codeDiv.appendChild(preElement);

                const codeSplits = highlightLineRange(preElement.innerHTML, []);
                let finalCode = ``;
                const lastIdx = codeSplits.length - 1;
                codeSplits.forEach((split, idx) => {
                    finalCode += split.highlight
                        ? split.code
                        : `${split.code}${idx === lastIdx ? `` : `\n`}`
                });

                preElement.innerHTML = finalCode;
            }
        });
        content = dom.window.document.body.innerHTML;
    }

    return content;
};
