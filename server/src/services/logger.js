const chalk = require('chalk')

module.exports = function(author, code, message) {
    return console.log(chalk`
${chalk.blue.underline.bold(author)} says: {green ${code}} {white ${message}}
`)
}
