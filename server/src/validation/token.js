const CONFIG = require('../../config')
const jwt = require('jsonwebtoken')
const Models = require('./../models')

module.exports = {
    async validate(req, res, next) {
        if (!req.headers['authorization']) res.status(401).send()

        try {
            var decoded = jwt.verify(
                req.headers['authorization'],
                CONFIG.authentication.jwtSecret
            )

            const user = await Models.User.findOne({
                where: {
                    login: decoded.login,
                },
            })

            if (decoded.password === user.password) next()
            else res.status(401).send()
        } catch (err) {
            res.status(401).send()
        }
    },
}
