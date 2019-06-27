const Models = require('../models')
const { validationResult } = require('express-validator/check')
const Model = Models.Event
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const Op = Sequelize.Op

module.exports = {
    get(req, res) {
        try {
            const availableFormats = ['ru', 'en', 'lv']

            if (availableFormats.includes(req.query.lang)) {
                const file = path.join(
                    __dirname,
                    '../../../client/src/locales/' + req.query.lang + '.json'
                )

                let result = JSON.parse(fs.readFileSync(file, 'utf8'))
                res.send(result)
            } else {
                throw 'Bad language'
            }
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong ' + err,
            })
        }
    },
}
