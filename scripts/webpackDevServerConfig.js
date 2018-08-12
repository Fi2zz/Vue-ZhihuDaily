const reporter = require("./webpackDevServerReporter");
const config = require("./config");
module.exports = {
  clientLogLevel: "warning",
  hot: true,
  contentBase: config.devServer.contentBase,
  compress: false,
  host: config.devServer.host,
  port: config.devServer.port,
  overlay: { warnings: false, errors: true },
  publicPath: config.devServer.publicPath,
  proxy: config.devServer.proxyTable,
  quiet: false,
  watchOptions: {
    poll: false
  },
  reporter
};
