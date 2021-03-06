const Models = require('../models')
const { validationResult } = require('express-validator/check')
const Model = Models.Event
const Sequelize = require('sequelize')
const moment = require('moment')
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
                        Sequelize.or(
                            (
                                Sequelize.where(
                                    Sequelize.fn('MONTH', Sequelize.col('dateStart')),
                                    req.query.month
                                ),
                                Sequelize.where(
                                    Sequelize.fn('YEAR', Sequelize.col('dateStart')),
                                    req.query.year
                                )
                            ),
                            (
                                Sequelize.where(
                                    Sequelize.fn('MONTH', Sequelize.col('dateEnd')),
                                    req.query.month
                                ),
                                Sequelize.where(
                                    Sequelize.fn('YEAR', Sequelize.col('dateEnd')),
                                    req.query.year
                                )
                            ),
                        ),
                        { preview: 0, show: 1 }
                    ),
                })
            } else {
                result = await Model.findAll({
                    raw: true,
                    order: [['dateStart', 'ASC']],
                    where: [{ preview: 0, show: 1 }],
                })
            }

            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getHero(req, res) {
        const now = moment()

        try {
            const result = await Model.findAll({
                raw: true,
                where: Sequelize.and(
                    { priority: 1, show: 1 }
                ),
                order: [['dateStart', 'DESC']],
            })

            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getAnnounce(req, res) {
        const now = moment()

        try {
            const result = await Model.findAll({
                raw: true,
                where: Sequelize.and(
                    {
                        dateStart: {
                            [Op.gte]: now
                        }
                    },
                    { priority: 0 },
                    { preview: 0, show: 1 }
                ),
                order: [['dateStart', 'DESC']],
            })

            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getAdmin(req, res) {
        try {
            const result = await Model.findAll({
                raw: true,
                order: [['createdAt', 'DESC']],
            })

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
                    show: 1,
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
