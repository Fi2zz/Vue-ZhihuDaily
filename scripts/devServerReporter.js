const formatWebpackMessages = require("./formatWebpackMessages");
const chalk = require("chalk");

const reporter = (context, report) => {
  if (report.log) {
    console.log(chalk.green("> Compile successfully"));
  }
  if (report.stats) {
    report = formatWebpackMessages(report.stats.toJson());
    if (report.errors.length) {
      console.log(chalk.red(report.errors.join("\n\n")));
    }
  }
};

module.exports = reporter;
