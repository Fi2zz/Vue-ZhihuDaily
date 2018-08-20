const chalk = require("chalk");

module.exports = function webpackMessageFormatter(stat, next) {
  if (!stat) {
    return true;
  }

  let message = stat.toJson({}, true);
  let msg = "> Compiled Successfuly";
  if (message.errors.length) {
    msg = chalk.red("Failed to complie");
    if (next) {
      next(message.errors);
    }
    return false;
  } else if (message.warnings.length) {
    msg = chalk.red("Compiled with warnings");
    console.log(chalk.yellow(message.warnings.join("\n\n")));
  } else {
    msg = chalk.green(msg);
  }
  console.log(msg);
  return true;
};
