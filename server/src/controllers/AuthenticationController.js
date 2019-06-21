const Models = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const { validationResult } = require('express-validator/check')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK,
    })
}
module.exports = {
    async login(req, res) {
        console.log('login try')
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        // try {
        //     const { login, password } = req.body
        //     const user = await Models.User.findOne({
        //         where: {
        //             login: login,
        //         },
        //     })

        //     if (!user) {
        //         return res.status(403).send({
        //             error: true,
        //             message: 'The login information was incorrect',
        //         })
        //     }

        //     const isPasswordValid = await user.comparePassword(password)

        //     if (!isPasswordValid) {
        //         return res.status(403).send({
        //             error: true,
        //             message: 'The login information was incorrect',
        //         })
        //     }

        //     const userJson = user.toJSON()

        //     res.send({
        //         user: userJson,
        //         token: jwtSignUser(userJson),
        //     })
        // } catch (err) {
        //     res.status(500).send({
        //         error: 'An error has occureed trring to log in',
        //     })
        // }
    },
    async registerAdmin() {
        try {
            const user = await Models.User.create(config.admin)
            return user.toJSON()
        } catch (err) {
            return false
        }
    },
}
