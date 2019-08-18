const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
const CONFIG = require('./../../config')
const Models = require('../models')

module.exports = {
    templates: {
        partnership() {
            return {
                from: 'Inbalans website <inbalansweb@gmail.com>',
                to: 'sergeikalpakov@gmail.com',
                // to: settings[0].contactFormEmail,
                subject: 'New contact request!',
                text: 'Info from contact form',
                html: `<h1>Info from contact form</h1>
                <div>Subject: ${req.body.type}</div>
                <div>Client Fullname: ${req.body.fullname}</div>
                <div>Client Email: ${req.body.email}</div>
                <div>Client phone: ${req.body.phone}</div>
            `, // html body
            }
        },
    },
    async send(req) {
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

        console.log(req.body)

        const HelperOptions = {
            from: 'Inbalans website <inbalansweb@gmail.com>',
            to: 'sergeikalpakov@gmail.com',
            // to: settings[0].contactFormEmail,
            subject: 'New contact request!',
            text: `Text from contact form${JSON.stringify(req.body)}`,
            html: `<h1>Text from contact form</h1>
            <div>Subject: ${req.body.type}</div>
            <div>Client Fullname: ${req.body.fullname}</div>
            <div>Client Email: ${req.body.email}</div>
            <div>Client phone: ${req.body.phone}</div>
        `, // html body
        }

        transporter.sendMail(HelperOptions, error => {
            console.log('sendmail error')
            if (error) console.log(error)
            else console.log('Mail send Success')

            transporter.close()
        })
    },
}
