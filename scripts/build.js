"use strict";
process.env.NODE_ENV = "production";
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const config = require("./config");
const webpackConfig = require("./webpack.config");
const fs = require("fs-extra");
function build() {
    console.log("building for production...");
    removeDistFolder();
    copyStaticFolder();
    return compiler(webpackConfig());
}
function removeDistFolder() {
    fs.emptyDirSync(config.dist);

}
function copyStaticFolder() {
    fs.copySync(config.assets, path.resolve(config.dist, config.assets));
}

build()
    .then(res => {
        console.log(chalk.cyan("  Build complete.\n"));
        console.log(
            chalk.yellow(
                "  Tip: built files are meant to be served over an HTTP server.\n" +
                "  Opening index.html over file:// won't work.\n"
            )
        );
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
            process.stdout.write(
                stats.toString({
                    colors: true,
                    modules: false,
                    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                    chunks: false,
                    chunkModules: false
                }) + "\n\n"
            );
            if (stats.hasErrors()) {
                reject(chalk.red("  Build failed with errors.\n"));
            }
        });
    });
}
