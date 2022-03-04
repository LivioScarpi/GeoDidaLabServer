module.exports = {
    css: {
        sourceMap: true
    },

    devServer: {
        proxy: {
            '/geodidalab/api': {target: "http://localost:8081/", changeOrigin: true}
        }
    },

    outputDir: 'target/dist',
    assetsDir: 'static',

    publicPath: process.env.NODE_ENV === 'production'
        ? '/geodidalab/'
        : '/geodidalab',
};
