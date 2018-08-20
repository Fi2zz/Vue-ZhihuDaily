const reporter = require("./webpackDevServerReporter");
const config = require("./config");
const serverApi = require("./serverApi");
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
  reporter,
  before(app) {
    
    app.get(/^\/api/, (req, res) => {
      console.log(req.url);
      function reponse(response) {
        let parse;
        try {
          parse = JSON.parse(response);
        } catch (e) {
          parse = response;
        }
        res.send(parse);
      }
      function reject(err) {
        console.log("error", err);
        res.send(`Error:${err}`);
      }
      serverApi(req.url)
        .then(reponse)
        .catch(reject);
    });
  }
};
