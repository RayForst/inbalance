const Models = require('../models')
const { validationResult } = require('express-validator/check')
const Model = Models.Settings
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
            const item = await Model.findOne({
                where: { id: 1 },
            })

            item.update(req.body)
            res.send('ok')
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async updatePriority(req, res) {
        try {
            await Models.Priority.update(
                {
                    priorityOnMain: req.body.id,
                },
                {
                    where: {
                        id: 1,
                    },
                }
            )

            res.send('ok')
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getPriority(req, res) {
        try {
            const result = await Models.Priority.findAll({
                raw: true,
                where: { id: 1 },
            })

            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
}
