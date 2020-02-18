const Models = require('../models')
const { validationResult } = require('express-validator/check')
const Model = Models.SettingsSeo
const Sequelize = require('sequelize')

const Op = Sequelize.Op

module.exports = {
    async get(req, res) {
        try {
            const result = await Model.findAll({
                raw: true,
            })

            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async update(req, res) {
        try {
            let alreadyExists = await Model.findOne({
                where: { id: 1 },
            })

            if (alreadyExists) {
                alreadyExists.update(req.body)
            } else {
                await Model.create(req.body)
            }

            res.send('ok')
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    }
}
