import Models from '../models'

module.exports = {
    async getInfo(req, res) {
        try {
            const task = await Models.User.findAll({
                where: {
                    id: 1
                }
            })
            res.send(task[0])
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
}
