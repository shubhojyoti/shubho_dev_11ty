const plugins = [
    require('postcss-import'),
    require('tailwindcss')('./src/styles/tailwind.config.js'),
    require('postcss-nested')
];
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    plugins.push(require('cssnano')({
        preset: ['default', {
            discardComments: {
                removeAll: true,
            },
            autoprefixer: { add: true }
        }]
    }));
}

module.exports = { plugins };
