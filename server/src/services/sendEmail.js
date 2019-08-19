const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
const CONFIG = require('./../../config')
const Models = require('../models')

module.exports = {
    async send(subject, html) {
        var options = {
            auth: {
                api_key: CONFIG.smtp.token,
            },
        }

        var transporter = nodemailer.createTransport(sgTransport(options))

        const settings = await Models.Settings.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']],
            raw: true,
        })

        const HelperOptions = {
            from: 'Inbalans website <inbalansweb@gmail.com>',
            to: settings[0].contactFormEmail,
            subject,
            text: `Text from ${subject} form`,
            html: `<h1>Text from contact form</h1>
            ${html}`,
        }

        transporter.sendMail(HelperOptions, error => {
            if (error) console.log(error)
            else console.log('Mail send Successfuly')
            transporter.close()
        })
    },
}
