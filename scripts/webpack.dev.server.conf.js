const reporter = require("./webpackDevServerReporter");
module.exports = {
  clientLogLevel: "warning",
  hot: true,
  contentBase: "/", // since we use CopyWebpackPlugin.
  compress: false,
  host: "localhost",
  port: 8080,
  overlay: { warnings: false, errors: true },
  publicPath: "/",
  proxy: {},
  quiet: false, // necessary for FriendlyErrorsPlugin
  watchOptions: {
    poll: false
  },
  reporter
};
