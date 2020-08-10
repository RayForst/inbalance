const Models = require('../models')
const { validationResult } = require('express-validator/check')
const Model = Models.Event
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const Op = Sequelize.Op
const availableFormats = ['ru', 'en', 'lv']

module.exports = {
    get(req, res) {
        try {
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
    async save(req, res) {
        try {
            if (availableFormats.includes(req.body.lang)) {
                const file = path.join(
                    __dirname,
                    '../../../client/src/locales/' + req.query.lang + '.json'
                )


                fs.writeFileSync(
                    file,
                    JSON.stringify(req.body.json),
                    'utf-8'
                )

                res.send({
                    result: 'ok',
                })
            } else {
                throw 'Bad language'
            }

        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
}
