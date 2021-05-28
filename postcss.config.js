module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-nested': {},
    'cssnano': {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        }
      }]
    },
    autoprefixer: {},
  },
}
