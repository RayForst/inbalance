const Model = Models.Event
const Sequelize = require('sequelize')

module.exports = {
  save(req, res) {
    try {
        const event = await Model.create(req.body)
        res.send(event.toJSON())
    } catch (err) {
        res.status(400).send({
            error: err.errors[0].type,
        })
    }
  }
}
