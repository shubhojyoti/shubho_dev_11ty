const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  purge: ['./src/html/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: '640px',
        lg: '1200px',
        smmax: { 'max': '640px' },
        hmmax: { 'raw': '(max-height: 820px)'}
      },
      fontFamily: {
        serif: ['Wotfard', ...defaultTheme.fontFamily.serif]
      },
      fontSize: {
        '0.9': '0.9rem'
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
        'off-menu': '-10px 10px 5px var(--header-shadow);',
      },
      maxWidth: {
        '85pc': '85%',
        '95pc': '95%',
        '1371': '1371px',
        '145': '145px'
      },
      minWidth: {
        '30pc': '30%'
      },
      margin: {
        41: '10.25rem',
        42: '10.5rem',
        43: '10.75rem',
        45: '11.35rem',
        social: '0.7rem'
      },
      padding: {
        social: '0.7rem'
      },
      width: {
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
        social: '44px'
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
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      margin: ['first']
    },
  },
  plugins: [
      require('@tailwindcss/typography')
  ],
}
