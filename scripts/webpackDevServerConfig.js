const config = require("./config");
const formatWebpackMessages = require("./formatWebpackMessages");
const chalk = require("chalk");
const devServerConfig = () => ({
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
  reporter(context, report) {
    if (report.stats) {
      report = formatWebpackMessages(report.stats.toJson());
      if (report.errors.length) {
        console.log(chalk.red(report.errors.join("\n\n")));
      }
    }
  },
  before: require("./api")
});

module.exports = devServerConfig();
