const axios = require('axios');
const to = require('await-to-js').default;
require('dotenv').config();
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Prism = require("prismjs");
const loadLanguages = require('prismjs/components/index.js');
loadLanguages(['python', 'tcl', 'yaml', 'php', 'markup', 'css', 'javascript', 'bash', 'jsx']);
const rangeParser = require(`parse-numeric-range`);
const { AssetCache } = require("@11ty/eleventy-cache-assets");

const HIGHLIGHTED_JSX_COMMENT_START = `<span class="token punctuation">\\{<\\/span><span class="token comment">\\/\\*`
const HIGHLIGHTED_JSX_COMMENT_END = `\\*\\/<\\/span><span class="token punctuation">\\}</span>`
const HIGHLIGHTED_HTML_COMMENT_START = `&lt;!--`

const PRISMJS_COMMENT_OPENING_SPAN_TAG = `(<span\\sclass="token\\scomment">)?`
const PRISMJS_COMMENT_CLOSING_SPAN_TAG = `(<\\/span>)?`

const COMMENT_START = new RegExp(
    `(#|\\/\\/|\\{\\/\\*|\\/\\*+|${HIGHLIGHTED_HTML_COMMENT_START})`
)

const createDirectiveRegExp = featureSelector =>
    new RegExp(`${featureSelector}-(next-line|line|start|end|range)({([^}]+)})?`)

const COMMENT_END = new RegExp(`(-->|\\*\\/\\}|\\*\\/)?`)
const DIRECTIVE = createDirectiveRegExp(`(highlight|hide)`)
const HIGHLIGHT_DIRECTIVE = createDirectiveRegExp(`highlight`)

const END_DIRECTIVE = {
    highlight: /highlight-end/,
    hide: /hide-end/,
}

const MULTILINE_TOKEN_SPAN = /<span class="token ([^"]+)">[^<]*\n[^<]*<\/span>/g

const stripComment = line =>
    line.replace(
        new RegExp(
            `\\s*(${HIGHLIGHTED_JSX_COMMENT_START}|${PRISMJS_COMMENT_OPENING_SPAN_TAG}${COMMENT_START.source})\\s*${DIRECTIVE.source}\\s*(${HIGHLIGHTED_JSX_COMMENT_END}|${COMMENT_END.source}${PRISMJS_COMMENT_CLOSING_SPAN_TAG})`
        ),
        ``
    )

const highlightWrap = line =>
    [`<span class="highlight-code-line">`, line, `</span>`].join(``)

const parseLine = (line, code, index, actions) => {
    const [, feature, directive, directiveRange] = line.match(DIRECTIVE)
    const flagSource = {
        feature,
        index,
        directive: `${feature}-${directive}${directiveRange}`,
    }
    switch (directive) {
        case `next-line`:
            actions.flag(feature, index + 1, flagSource)
            actions.hide(index)
            break
        case `start`: {
            const endIndex = code.findIndex(
                (line, idx) => idx > index && END_DIRECTIVE[feature].test(line)
            )

            const end = endIndex === -1 ? code.length : endIndex

            actions.hide(index)
            actions.hide(end)

            for (let i = index + 1; i < end; i++) {
                actions.flag(feature, i, flagSource)
            }
            break
        }
        case `line`:
            actions.flag(feature, index, flagSource)
            actions.stripComment(index)
            break
        case `range`:
            actions.hide(index)

            if (directiveRange) {
                const strippedDirectiveRange = directiveRange.slice(1, -1)
                const range = rangeParser(strippedDirectiveRange)
                if (range.length > 0) {
                    range.forEach(relativeIndex => {
                        actions.flag(feature, index + relativeIndex, flagSource)
                    })
                    break
                }
            }

            console.warn(`Invalid match specified: "${line.trim()}"`)
            break
    }
}

function highlightLineRange(code, highlights = []) {
    if (highlights.length > 0 || HIGHLIGHT_DIRECTIVE.test(code)) {
        code = code.replace(MULTILINE_TOKEN_SPAN, (match, token) =>
            match.replace(/\n/g, `</span>\n<span class="token ${token}">`)
        )
    }

    const split = code.split(`\n`)
    const lines = split.map(code => {
        return { code, highlight: false, hide: false, flagSources: [] }
    })

    const actions = {
        flag: (feature, line, flagSource) => {
            if (line >= 0 && line < lines.length) {
                const lineMeta = lines[line]
                lineMeta[feature] = true
                lineMeta.flagSources.push(flagSource)
            }
        },
        hide: line => actions.flag(`hide`, line),
        highlight: line => actions.flag(`highlight`, line),
        stripComment: line => {
            lines[line].code = stripComment(lines[line].code)
        },
    }

    const transform = lines =>
        lines
            .filter(({ hide, highlight, flagSources }, index) => {
                if (hide && highlight) {
                    const formattedSources = flagSources
                        .map(
                            ({ feature, index, directive }) =>
                                `  - Line ${index + 1}: ${feature} ("${directive}")`
                        )
                        .join(`\n`)
                    throw Error(
                        `Line ${
                            index + 1
                        } has been marked as both hidden and highlighted.\n${formattedSources}`
                    )
                }

                return !hide
            })
            .map(line => {
                if (line.highlight) {
                    line.code = highlightWrap(line.code)
                }
                return line
            })

    if (highlights.length > 0) {
        highlights.forEach(lineNumber => {
            actions.highlight(lineNumber - 1)
        })
        return transform(lines)
    }

    for (let i = 0; i < split.length; i++) {
        const line = split[i]
        if (DIRECTIVE.test(line)) {
            parseLine(line, split, i, actions)
        }
    }

    return transform(lines)
}


const TZ = process.env.TZ || 'UTC';
const WP_URL = process.env.WP_URL || 'https://notfoundsomething.com';
const WP_USER = process.env.WP_USER || '';
const WP_PWD = process.env.WP_PASSWORD || '';

const postDateFormatString = 'MMM DD, YYYY';
const postDateFormat = 'YYYY-MM-DD';
const postDateStdFormat = 'YYYY-DD-MMTHH:mm:ss'

const headers = {
    'Content-Type': 'application/json'
};
if (WP_USER !== '' && WP_PWD !== '') {
    headers.Authorization = `Basic ${Buffer.from(`${WP_USER}:${WP_PWD}`).toString('base64')}`;
}

// https://martinschneider.me/articles/building-a-website-with-11ty-and-wordpress/
const highlightCode = (content) => {
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
                syntaxDiv.innerHTML = language;
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
}

const getQuery = (next_cursor = '') => `
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
`;

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

const getAllDataRecursively = async () => {
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
        const query = getQuery(nextCursor);
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
            let content = highlightCode(node.content);
            // Make relative URLs absolute (would work otherwise on the site, but not in the feed)
            content = content.replace(
                'href="/',
                'href="https://www.shubho.dev/'
            );
            return {
                ...node,
                postDate: dayjs.utc(node.date).tz(TZ).format(postDateFormatString),
                postDateUtc: dayjs.utc(node.date).format(postDateStdFormat),
                ogPostDateIst: `${node.date}.000+05:30`,
                ldPostDate: dayjs.utc(node.date).tz(TZ).format(postDateFormat),
                modifiedDate: dayjs.utc(node.modified).tz(TZ).format(postDateFormatString),
                modifiedDateUtc: dayjs.utc(node.modified).format(postDateStdFormat),
                ogModifiedDateIst: `${node.modified}.000+05:30`,
                ldModifiedDate: dayjs.utc(node.modified).tz(TZ).format(postDateFormat),
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

module.exports = getAllDataRecursively();


