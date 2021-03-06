const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: { //"./src/index.js",
        "index": "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js"
    },
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        port: 9000,
        //watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9100,
            proxy: 'http://localhost:9005'
        }, {
            reload: true
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
            }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/kontakt.html',
            inject: true,
            chunks: ['index'],
            filename: 'kontakt.html'
        }),
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: './dest/assets'
        }]),
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js"
        },
    module: {
        rules: [{
            test: /\.scss$/,
            // use: ["style-loader/url","file-loader"] 
            use: [
                // "style-loader",
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            }

        },
        {
            test: /\.(html)$/,
            use: ["html-loader"]
        },
        {
            test: /\.scss$/,
            use: [
            // "style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            "postcss-loader"]
            },
        ]
    },
} 