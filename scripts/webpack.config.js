"use strict";
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


const config = require("./config");
const resolve = dir => path.join(__dirname, "..", dir);
const assetsPath = (_path) => path.posix.join("./static", _path);


module.exports = function webpackConfig(mode) {


    const styleLoader = (loaderType) => {
        let loaders = [
            "vue-style-loader",
            mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader"
        ];
        loaders.push(`${loaderType}-loader`);
        return loaders;
    };
    const webpackConfig = {
        mode: mode,
        context: path.resolve(__dirname, "../"),
        entry: {
            app: "./src/main.js"
        },
        output: {
            path: config.dist,
            filename: "js/[name].js",
            chunkFilename: assetsPath("js/[id].js"),
            publicPath: config.publicUrl
        },
        resolve: {
            extensions: [".js", ".vue", ".json"],
            alias: {
                vue: "vue/dist/vue.esm.js",
                "@": resolve("src")
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: `"${mode}"`
                }
            }),
            new VueLoaderPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
                },
                {
                    test: /\.css$/,
                    use: styleLoader()
                },
                {
                    test: /\.styl$/,
                    use: styleLoader("stylus")
                },
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    include: [
                        resolve("src"),
                        resolve("test"),
                        resolve("node_modules/webpack-dev-server/client")
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: assetsPath("img/[name].[hash:7].[ext]")
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: assetsPath("media/[name].[hash:7].[ext]")
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: assetsPath("fonts/[name].[hash:7].[ext]")
                    }
                }
            ]
        },
        node: {
            // prevent webpack from injecting useless setImmediate polyfill because Vue
            // source contains it (although only uses it if it's native).
            setImmediate: false,
            // prevent webpack from injecting mocks to Node native modules
            // that does not make sense for the client
            dgram: "empty",
            fs: "empty",
            net: "empty",
            tls: "empty",
            child_process: "empty"
        }
    };


    if (mode === "development") {
        webpackConfig.devtool = "cheap-module-eval-source-map"
        webpackConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
            new webpack.NoEmitOnErrorsPlugin(),
            // https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "index.html",
                inject: true
            })
        )
    }
    else {

        webpackConfig.plugins.push(
            // http://vuejs.github.io/vue-loader/en/workflow/production.html
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                sourceMap: false,
                parallel: true
            }),

            new MiniCssExtractPlugin({
                filename: "css/[name].css",
                chunkFilename: "[id].css"
            }),
            // generate dist index.html with correct asset hash for caching.
            // you can customize output by editing /index.html
            // see https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                filename: config.index,
                template: "index.html",
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                }
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                // chunksSortMode: "dependency"
            }),
            // keep module.id stable when vendor modules does not change
            new webpack.HashedModuleIdsPlugin(),
            // enable scope hoisting
            new webpack.optimize.ModuleConcatenationPlugin()
        )
    }
};


