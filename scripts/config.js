"use strict";
const path = require("path");
module.exports = {
  dist: path.resolve(__dirname, "../dist"),
  publicUrl: "/",
  assets: "./static",
  index: path.resolve(__dirname, "../dist/index.html"),
  env: {
    production: "production",
    development: "development"
  },
  devServer: {
    proxyTable: {},
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080,
    publicPath: "/",
    contentBase: "/"
  }
};
