"use strict";
const path = require("path");
const webpack = require("webpack");
const config = require("./config");
function resolve(dir) {
    return path.join(__dirname, "..", dir);
}
const assetsPath = function (_path) {
    return path.posix.join("./static", _path);
};
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const devMode = process.env.NODE_ENV !== "production";
const workingMode = devMode ? "development" : process.env.NODE_ENV;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function nodeENV(mode) {

    return {
        NODE_ENV: `'${mode}'`
    }
}

const currConfig = config[workingMode];

const webpackConfig = {
    mode: workingMode,
    context: path.resolve(__dirname, "../"),
    devtool: currConfig.devtools,
    entry: {
        app: "./src/main.js"
    },
    output: {
        path: config.production.dist,
        filename: "js/[name].js",
        chunkFilename: assetsPath("js/[id].js"),
        publicPath: currConfig.publicUrl
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
            "process.env": nodeENV(workingMode)
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
                use: [
                    "vue-style-loader",
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "vue-style-loader",
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader"
                ]
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


if (devMode) {

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
            sourceMap: config.production.productionSourceMap,
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
            filename: config.production.index,
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


module.exports = ()=>webpackConfig;