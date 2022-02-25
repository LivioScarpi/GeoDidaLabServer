module.exports = {
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    },
    devServer: {
        proxy: {
            '/api': {target: "http://localost:8081", changeOrigin: true}
        }
    },
    outputDir: 'target/dist',
    assetsDir: 'static',
};
