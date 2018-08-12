const config = require("./config");
process.env.NODE_ENV = config.env.development;
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const runApiServer = require("../server");
const webpackConfig = require("./webpack.config");
const isInteractive = process.stdout.isTTY;
const webpackDevServerConfig = require("./webpack.dev.server.conf");
const chalk = require("chalk");
function clearConsole() {
  process.stdout.write(
    process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H"
  );
}

function createCompiler(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.log(err);
    console.log(chalk.red("Failed to compile."));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }
  compiler.hooks.compile.tap("compiling", stat => {
    console.log(chalk.blue("> Compiling..."));
  });
  return compiler;
}

function runDevServer() {
  let port = webpackDevServerConfig.port;
  console.log("");
  console.log(chalk.green("> Starting the development server..."));
  const devServer = new WebpackDevServer(
    createCompiler(webpackConfig(config.env.development)),
    webpackDevServerConfig
  );

  devServer.listen(port, "localhost", err => {
    if (err) {
      throw err;
    }
    console.log(
      chalk.yellow("> Your app is running on http://localohost" + port)
    );
    console.log(chalk.yellow("> Compilation is not done yet,please wait"));
  });
  ["SIGINT", "SIGTERM"].forEach(function(sig) {
    process.on(sig, function() {
      devServer.close();
      process.exit();
    });
  });
}
function runAll() {
  console.log(" ");
  console.log("Starting api server...");
  console.log(" ");
  runApiServer(runDevServer);
}
runAll();
