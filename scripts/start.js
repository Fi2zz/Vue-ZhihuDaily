const config = require("./config");
process.env.NODE_ENV = config.env.development;
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const runApiServer = require("../server");
const webpackConfig = require("./webpack.config");
const isInteractive = process.stdout.isTTY;
const webpackDevServerConfig = require("./webpack.dev.server.conf");
function runDevServer() {
    console.log("Starting the development server...\n");
    const compiler = webpack(webpackConfig(config.env.development));
    const devServer = new WebpackDevServer(compiler, webpackDevServerConfig);
    devServer.listen(webpackDevServerConfig.port, "localhost", err => {
        if (err) {
            throw err
        }
        console.log(
            `Your application is running here: http://localhost:${
                webpackDevServerConfig.port
                }`
        );
    });
    ["SIGINT", "SIGTERM"].forEach(function (sig) {
        process.on(sig, function () {
            devServer.close();
            process.exit();
        });
    });
};
runApiServer(runDevServer)