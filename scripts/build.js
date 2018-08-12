"use strict";
process.env.NODE_ENV ="production";
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const fs = require("fs-extra");
const config = require("./config");
const webpackConfig = require("./webpack.config");
const messageFormatter = require("./webpackMessageFormatter");
function build() {
    console.log("> Building for production...");
    removeDistFolder();
    copyStaticFolder();
    return compiler(webpackConfig("production"));
}
function removeDistFolder() {
    fs.emptyDirSync(config.dist);
}
function copyStaticFolder() {
    fs.copySync(config.assets, path.resolve(config.dist, config.assets));
}

build()
    .then(res => {
        console.log(chalk.cyan("Build complete.\n"));
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });


function compiler(config) {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) {
                reject(err);
            }
            let next = messageFormatter(stats, reject);
            if (next) {
                resolve()
            }
        });
    });
}
