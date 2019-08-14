const Models = require('../models')
const Model = Models.CallMeBack

module.exports = {
    async save(req, res) {
        try {
            const event = await Model.create(req.body)
            res.send(event.toJSON())
        } catch (err) {
            console.log('error display')
            console.log(err)
            res.status(400).send({
                error: err.errors[0].type,
            })
        }
    },
}
