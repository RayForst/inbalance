const Models = require('../models')
const Model = Models.PartnershipRequest
const Email = require('../services/sendEmail')

module.exports = {
    async save(req, res) {
        try {
            const event = await Model.create(req.body)

            Email.send(req)
            res.send(event.toJSON())
        } catch (err) {
            res.status(400).send({
                error: err.errors[0].type,
            })
        }
    },
    async get(req, res) {
        try {
            let result = await Model.findAll({
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
}
