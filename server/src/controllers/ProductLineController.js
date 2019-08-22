const Models = require('../models')
const Model = Models.ProductLine

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
    async save(req, res) {
        try {
            const work = await Model.create(req.body)
            res.send({})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async edit(req, res) {
        try {
            const item = await Model.findOne({
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
