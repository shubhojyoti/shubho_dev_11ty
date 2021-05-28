/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    mount: {
        'src/html': { url: '/', static: true },
        'src/css': { url: '/css' },
        'src/js': { url: '/js' },
        'src/images': { url: '/images', static: true, resolve: false }
    },
    plugins: [
        '@snowpack/plugin-postcss',
        ['@snowpack/plugin-webpack']
    ],
};
