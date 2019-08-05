const Models = require('../models')
const { validationResult } = require('express-validator/check')
const Model = Models.StaticPage
const Sequelize = require('sequelize')

const Op = Sequelize.Op

module.exports = {
    async save(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            const article = await Model.create(req.body)
            res.send(article.toJSON())
        } catch (err) {
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
    async getMenu(req, res) {
        try {
            const result = await Model.findAll({
                raw: true,
                order: [['createdAt', 'DESC']],
                attributes: [
                    'id',
                    'name',
                    'name_lv',
                    'name_ru',
                    'slug',
                    'menupos',
                ],
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
