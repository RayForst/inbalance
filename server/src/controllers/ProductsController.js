const Models = require('../models')
const { validationResult } = require('express-validator/check')
const Model = Models.Product
const Sequelize = require('sequelize')

const Op = Sequelize.Op

module.exports = {
    async save(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            const work = await Model.create(req.body)
            res.send(work.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getByPriority(req, res) {
        try {
            const result = await Model.findAll({
                raw: true,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Models.ProductSubcategory,
                        attributes: ['name'],
                        include: [
                            {
                                model: Models.ProductCategory,
                                attributes: ['name', 'name_lv', 'name_ru'],
                            },
                        ],
                    },
                ],
                where: {
                    '$ProductSubcategory.ProductCategory.id$':
                        req.query.category,
                    '$ProductSubcategory.id$': {
                        [Op.ne]: null,
                    },
                    priority: 1,
                },
            })

            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async get(req, res) {
        try {
            let result

            if (req.query.category) {
                result = await Model.findAll({
                    raw: true,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: Models.ProductSubcategory,
                            attributes: ['name'],
                            include: [
                                {
                                    model: Models.ProductCategory,
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                    where: {
                        '$ProductSubcategory.ProductCategory.slug$':
                            req.query.category,
                        '$ProductSubcategory.id$': {
                            [Op.ne]: null,
                        },
                    },
                })
            } else if (req.query.subcategory) {
                result = await Model.findAll({
                    raw: true,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: Models.ProductSubcategory,
                            attributes: ['name'],
                        },
                    ],
                    where: {
                        '$ProductSubcategory.slug$': req.query.subcategory,
                        '$ProductSubcategory.id$': {
                            [Op.ne]: null,
                        },
                    },
                })
            } else {
                result = await Model.findAll({
                    raw: true,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: Models.ProductSubcategory,
                            attributes: ['name'],
                        },
                    ],
                    where: {
                        '$ProductSubcategory.id$': {
                            [Op.ne]: null,
                        },
                    },
                })
            }

            res.send(result)
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
    async getAdmin(req, res) {
        try {
            let result

            if (req.query.category) {
                result = await Model.findAll({
                    raw: true,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: Models.ProductSubcategory,
                            attributes: ['name'],
                            include: [
                                {
                                    model: Models.ProductCategory,
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                    where: {
                        '$ProductSubcategory.ProductCategory.slug$':
                            req.query.category,
                    },
                })
            } else if (req.query.subcategory) {
                result = await Model.findAll({
                    raw: true,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: Models.ProductSubcategory,
                            attributes: ['name'],
                        },
                    ],
                    where: {
                        '$ProductSubcategory.slug$': req.query.subcategory,
                    },
                })
            } else {
                result = await Model.findAll({
                    raw: true,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: Models.ProductSubcategory,
                            attributes: ['name'],
                        },
                    ],
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
                    '$ProductSubcategory.id$': {
                        [Op.ne]: null,
                    },
                },
                include: [
                    {
                        model: Models.ProductSubcategory,
                        attributes: ['name', 'slug'],
                        include: [
                            {
                                model: Models.ProductCategory,
                                attributes: ['id', 'slug'],
                            },
                        ],
                    },
                ],
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
