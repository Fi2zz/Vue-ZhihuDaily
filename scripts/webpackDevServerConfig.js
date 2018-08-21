const devServerConfig = (config, reporter, before) => ({
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
  reporter,
  before
});

module.exports = devServerConfig(
  require("./config"),
  require("./devServerReporter"),
  require("./api")
);
