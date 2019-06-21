import Models from '../models'
const { validationResult } = require('express-validator/check')
const Model = Models.Event
import Sequelize from 'sequelize'

const Op = Sequelize.Op

module.exports = {
    async save(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            const event = await Model.create(req.body)
            res.send(event.toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async edit(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            const item = await Model.findOne({
                where: { id: req.body.id },
            })

            item.update(req.body)
            res.send(item.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async get(req, res) {
        try {
            let result

            if (req.query.month && req.query.year) {
                result = await Model.findAll({
                    raw: true,
                    order: [['dateStart', 'ASC']],
                    where: Sequelize.and(
                        Sequelize.where(
                            Sequelize.fn('MONTH', Sequelize.col('dateStart')),
                            req.query.month
                        ),
                        Sequelize.where(
                            Sequelize.fn('YEAR', Sequelize.col('dateStart')),
                            req.query.year
                        )
                    ),
                })
            } else {
                result = await Model.findAll({
                    raw: true,
                    order: [['dateStart', 'ASC']],
                })
            }

            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getBySlug(req, res) {
        try {
            const result = await Model.findOne({
                where: {
                    slug: req.query.slug,
                },
            })
            res.send(result ? result.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async remove(req, res) {
        try {
            await Model.destroy({
                where: {
                    id: req.body.id,
                },
            })
            res.send('deleted')
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
}
