const Models = require('../models')
const Model = Models.ProductCategory
const SubcategoryModel = Models.ProductSubcategory

module.exports = {
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
    async update(req, res) {
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
    async getSubcategory(req, res) {
        try {
            let result

            if (req.query.category) {
                result = await SubcategoryModel.findAll({
                    raw: true,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: Model,
                            attributes: ['name', 'name_lv', 'name_ru'],
                        },
                    ],
                    where: {
                        '$ProductCategory.slug$': req.query.category,
                    },
                })
            } else {
                result = await SubcategoryModel.findAll({
                    raw: true,
                    order: [[Model, 'name', 'ASC'], ['createdAt', 'ASC']],
                    include: [
                        {
                            model: Model,
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
    async saveSubcategory(req, res) {
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({ errors: errors.array() })
        // }

        try {
            const work = await SubcategoryModel.create(req.body)
            res.send({})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async editSubcategory(req, res) {
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({ errors: errors.array() })
        // }

        try {
            // const category = await SubcategoryModel.update(
            //     {
            //         name: req.body.name,
            //         ProductCategoryId: req.body['ProductCategoryId'],
            //     },
            //     {
            //         where: {
            //             id: req.body.id,
            //         },
            //         individualHooks: true,
            //     }
            // )

            const item = await SubcategoryModel.findOne({
                where: { id: req.body.id },
            })

            item.update(req.body)
            res.send(item.toJSON())

            res.send('ok')
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async removeSubcategory(req, res) {
        try {
            await SubcategoryModel.destroy({
                where: {
                    id: req.body.id,
                },
            })

            res.send('ok')
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
}
