const Models = require('../models')
const { validationResult } = require('express-validator/check')

module.exports = {
    async saveStatus(req, res) {
        try {
            console.log('hit');
            console.log(req.body);
            await Models.Checkouts.update(
                { proceed: req.body.proceed },
                { where: { id: req.body.id } }

            );

            res.send('ok')
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    }
}
