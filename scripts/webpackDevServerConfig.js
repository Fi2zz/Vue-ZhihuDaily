const config = require("./config");
const messageFormatter = require("./webpackMessageFormatter");
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
  reporter(context, report) {
    messageFormatter(report.stats, err => {
      console.log(err.join("\n\n"));
      // process.exit();
    });
  },
  before: require("./api")
};
