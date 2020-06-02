const path = require('path');
const nodeExternals = require('webpack-node-externals');




module.exports = {
    entry: ['babel-polyfill', './src/server.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    // devServer: {
    //     inline: false,
    //     contentBase: path.resolve(__dirname, 'build'),
    // },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],

}