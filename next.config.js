require('dotenv').config();
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = withSass({
    webpack: (config) =>
    {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.API': JSON.stringify(process.env.API),
                'process.env.DATA_NAME': JSON.stringify(process.env.DATA_NAME)
            })
        );
        config.node =
        {
            fs: 'empty',
            tls: 'empty'
        };
        return config;
    },
    optimization: process.env.NODE_ENV === 'development' ? {} : {
        minimizer:
        [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions:
                {
                    compress: true,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: false
            })
        ]
    }
});