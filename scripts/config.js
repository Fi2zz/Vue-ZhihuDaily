"use strict";
// Template version: {{ template_version }}
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
    dist: path.resolve(__dirname, "../dist"),
    publicUrl: "/",
    assets: "./static",
    index: path.resolve(__dirname, "../dist/index.html"),
    proxyTable: {},
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    env: {
        production: "production",
        development: "development"
    }
};
