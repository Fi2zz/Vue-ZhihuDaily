const messageFormatter = require("./webpackMessageFormatter");
module.exports = function webpackDevSeverReporter(context, report) {
  // console.log(report);
  messageFormatter(report.stats, err => {
    console.log(err);
    process.exit();
  });
};
