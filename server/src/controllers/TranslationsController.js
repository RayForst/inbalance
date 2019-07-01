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
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({ errors: errors.array() })
        // }

        try {
            if (availableFormats.includes(req.body.lang)) {
                fs.writeFileSync(
                    `./../client/src/locales/${req.body.lang}.json`,
                    JSON.stringify(req.body.json),
                    'utf-8'
                )
                console.log(req.body.json)

                // const file = path.join(
                //     __dirname,
                //     '../../../client/src/locales/' + req.query.lang + '.json'
                // )

                // let result = JSON.parse(fs.readFileSync(file, 'utf8'))
                res.send({
                    result: 'ok',
                })
            } else {
                throw 'Bad language'
            }

            // const event = await Model.create(req.body)
            // res.send(event.toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
}
