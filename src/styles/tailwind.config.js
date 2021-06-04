const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    // mode: 'jit',
    mode: process.env.NODE_ENV ? 'jit' : undefined, // this is for IDE support in Webstorm. Once Webstorm can support JIT mode fully this should just be `jit`
    purge: [
        './src/**/*.html',
        './src/**/*.njk',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                sm: '640px',
                lg: '1200px',
                smmax: { 'max': '640px' },
                hmmax: { 'raw': '(max-height: 820px)'},
                'max500': { 'raw': '(max-width: 500px)'},
                lgmax: { 'raw': '(max-width: 1024px)' },
                lg1max: { 'raw': '(max-width: 1330px)' },
                lg2max: { 'raw': '(max-width: 1371px)' }
            },
            fontFamily: {
                serif: ['Wotfard', ...defaultTheme.fontFamily.serif],
                mono: ['Source_Code_Pro']
            },
            fontSize: {
                '0.8': '0.8rem',
                '0.9': '0.9rem',
                '1.4': '1.4rem'
            },
            colors: {
                site: {
                    'body-bgcolor': 'var(--body-bgcolor)',
                    'invert-color': 'var(--invert-color)',
                    'text-color': 'var(--text-color)',
                    'article-separator': 'var(--article-separator)',
                    'header-shadow': 'var(--header-shadow)',
                    'link-color': 'var(--link-color)',
                    'switch-body-off-bgcolor': 'var(--switch-body-off-bgcolor)',
                    'switch-body-off-bordercolor': 'var(--switch-body-off-bordercolor)',
                    'switch-thumb-off-bgcolor': 'var(--switch-thumb-off-bgcolor)',
                    'switch-thumb-off-bordercolor': 'var(--switch-thumb-off-bordercolor)',
                    'switch-body-on-bgcolor': 'var(--switch-body-on-bgcolor)',
                    'switch-body-on-bordercolor': 'var(--switch-body-on-bordercolor)',
                    'switch-thumb-on-bgcolor': 'var(--switch-thumb-on-bgcolor)',
                    'switch-thumb-on-bordercolor': 'var(--switch-thumb-on-bordercolor)',
                    'home-intro-bordercolor': 'var(--home-intro-bordercolor)',
                    'home-intro-color': 'var(--home-intro-color)',
                    'home-intro-social-hover': 'var(--home-intro-social-hover)',
                    'post-tag-bgcolor': 'var(--post-tag-bgcolor)'
                }
            },
            height: {
                header: '95px',
                '48px': '48px',
                '7.1': '1.875rem',
                social: '44px'
            },
            boxShadow: {
                'header': '0 2px 5px var(--header-shadow)',
                'footer': '0 -2px 2px var(--header-shadow)',
                'off-menu': '-10px 10px 5px var(--header-shadow);',
            },
            maxWidth: {
                '85pc': '85%',
                '95pc': '95%',
                '1371': '1371px',
                '145': '145px',
                '1300': '1300px'
            },
            minWidth: {
                '30pc': '30%'
            },
            minHeight: {
                '48': '48px'
            },
            margin: {
                41: '10.25rem',
                42: '10.5rem',
                43: '10.75rem',
                45: '11.35rem',
                social: '0.7rem'
            },
            padding: {
                social: '0.7rem',
                '0.4': '0.4rem'
            },
            width: {
                40: '10rem',
                52: '13rem',
                '193px': '193px',
                '145px': '145px',
                '146px': '146px',
                '147px': '147px',
                '148px': '148px',
                '149px': '149px',
                '150px': '150px',
                '151px': '151px',
                '152px': '152px',
                social: '44px',
                'blog-list': '73%',
                '2.35': '2.35rem'
            },
            gridTemplateColumns: {
                header: 'auto 1fr auto'
            },
            gridTemplateRows: {
                header: '1fr'
            },
            inset: {
                '7.1': '1.875rem',
                offscreen: '9999px'
            },
            zIndex: {
                1: '1'
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: 'var(--text-color)',
                        h2: {
                            color: 'var(--text-color)'
                        },
                        a: {
                            color: 'var(--link-color)',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        },
                        strong: {
                            color: 'var(--text-color)'
                        },
                        ol: {
                            li: {
                                '&::before': {
                                    color: 'var(--invert-color)'
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    variants: {
        extend: {
            borderWidth: ['last'],
            margin: ['first'],
            visibility: ['focus'],
            opacity: ['focus', 'hover'],
            inset: ['focus', 'hover']
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
