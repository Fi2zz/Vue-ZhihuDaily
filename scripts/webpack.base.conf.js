"use strict";
const path = require("path");
const webpack = require("webpack");
const config = require("./config");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const assetsPath = function(_path, env) {
  const assetsSubDirectory = config[env].assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const devMode = process.env.NODE_ENV !== "production";
const workingMode = devMode ? "development" : process.env.NODE_ENV;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// path: config.production.assetsRoot,
// filename: utils.assetsPath("js/[name].js", "production"),
// chunkFilename: utils.assetsPath("js/[id].js")

module.exports = {
  mode: workingMode,
  context: path.resolve(__dirname, "../"),
  devtool: devMode ? config.development.devtool : false,
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: config.production.assetsRoot,
    filename: "js/[name].js",
    chunkFilename: assetsPath("js/[id].js", workingMode),
    publicPath: config[workingMode]["assetsPublicPath"]
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
        NODE_ENV: `'${workingMode}'`
      }
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config[workingMode].assetsSubDirectory,
        ignore: [".*"]
      }
    ])
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
          name: assetsPath("img/[name].[hash:7].[ext]", workingMode)
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("media/[name].[hash:7].[ext]", workingMode)
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("fonts/[name].[hash:7].[ext]", workingMode)
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
