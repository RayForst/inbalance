const Commander = require('commander')
const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = () => {
    Commander.option('--create-user', 'Create user').parse(process.argv)

    if (Commander.createUser) AuthenticationController.registerAdmin()
}
