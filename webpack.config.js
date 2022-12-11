/*
* Configuration file for Webpack - should meet most requirements
*
* Basic assumptions:
* 1. Entrypoint is 'src' directory so 'src/js/index.js'
* 2. Development mode writes to 'dist_dev'
* 3. Production mode writes to 'dist_prod'
* 4. Project uses jQuery, Bootstrap, Font Awesome and Leaflet
* 5. Project is a single-page app (SPA) and is also a progressive web app (PWA)
* */
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const OfflinePlugin = require('offline-plugin');


var config = {
    entry: {
        /*
        * An entry point indicates which module webpack should use to begin building out its internal dependency
        * graph.
        * */
        app: './src/js/index.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            /*
            * Automatically load modules instead of having to import or require them everywhere.
            * */
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin({
            /*
            * By default, this plugin will remove all files inside webpack's output.path directory, as well as all
            * unused webpack assets after every successful rebuild.
            * */
            verbose: true
        }),
        new MiniCssExtractPlugin({
            /*
            * This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
            * It supports On-Demand-Loading of CSS and SourceMaps.
            * */
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            /*
            * Takes a template (src/index.html) and produces a 'filled out' version according to the rules below. It
            * simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack
            * bundles that include a hash in the filename which changes every compilation.
            * */
            // title: "WMAP Sample 4",
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                description: 'AWM 2021 sample application',
            },
            template: "./src/index.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            },
            inject: "head"
        }),
        new FaviconsWebpackPlugin({
            /*
            * The default configuration will automatically generate webapp manifest files (reads package.json) along
            * with 44 different icon formats as appropriate for iOS devices, Android devices, Windows Phone and various
            * desktop browsers out of your single logo image.
            * */
            logo: './src/images/icon.png',
            mode: 'webapp',
            devMode: 'webapp',
            cache: true,
            inject: true,
            favicons: {
                background: '#ddd',
                theme_color: '#333',
                orientation: "portrait",
                lang: "en-GB",
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    favicons: true
                }
            }
        }),
        new OfflinePlugin({
            /*
            * This will automatically create a service worker and pre-cache our app shell and its assets.
            * */
            externals: [
                'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300italic,400,400italic,600'
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
        ]
    },
    module: {
        /*
        * Loaders for various file types. Note that we treat sass (scss) and css slightly differently
        * */
        rules: [
            {
                test: /\.(scss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.html$/i,
                use: ['html-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
        ]
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        /*
        * In 'development' mode so create js source map to help with debugging and auto-reload server for local testing.
        * Output should be to a 'dist_dev' directory. This name can vary.
        * */
        config.devtool = 'source-map';
        config.devServer = {
            contentBase: path.join(__dirname, 'dist_dev'),
            compress: true,
            port: 9501,
            open: true,
        };
        config.output = {
            filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, 'dist_dev'),
        };
    }
    if (argv.mode === 'production') {
        /*
        * Just use a different output directory for 'production' mode
        * */
        config.output = {
            filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, 'dist_prod'),
        };
    }
    return config;
};