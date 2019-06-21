const Models = require('../models')
const { validationResult } = require('express-validator/check')
const config = require('../../config')
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

async function sendMail(req) {
    var options = {
        auth: {
            api_key: config.smtpToken,
        },
    }

    var transporter = nodemailer.createTransport(sgTransport(options))

    const settings = await Models.Settings.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']],
        raw: true,
    })

    const HelperOptions = {
        from: 'GTA Website <admin@itdaddy.ca>',
        to: settings[0].contactFormEmail,
        subject: 'New contact request! + ' + req.body.type,
        text: `Text from contact form${JSON.stringify(req.body)}`,
        html: `<h1>Text from contact form</h1>
            <div>Subject: ${req.body.type}</div>
            <div>Client Fullname: ${req.body.fullname}</div>
            <div>Client Email: ${req.body.email}</div>
            <div>Client phone: ${req.body.phone}</div>
            <div>Message: ${req.body.message}</div>
        `, // html body
    }

    transporter.sendMail(HelperOptions, error => {
        if (error) console.log(error)
        else console.log('Mail send Success')

        transporter.close()
    })
}

module.exports = {
    async getSettings(req, res) {
        try {
            const meta = await Models.Meta.findAll({
                raw: true,
            })
            const headings = await Models.Head.findAll({
                raw: true,
            })

            const settings = await Models.Settings.findAll({
                limit: 1,
                order: [['createdAt', 'DESC']],
            })

            res.send(
                meta && headings
                    ? {
                        meta,
                        headings,
                        settings,
                    }
                    : {}
            )
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getKeySettings(req, res) {
        try {
            let record = await Models.Settings.findAll({
                limit: 1,
                order: [['createdAt', 'DESC']],
            })

            res.send(record ? record : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveSettings(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let record = await Models.Settings.findAll({
                limit: 1,
                order: [['createdAt', 'DESC']],
            })

            if (!record.length) {
                record = await Models.Settings.create(req.body)
            } else {
                await record[0].update(req.body)
                record = record[0]
            }

            res.send(record.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getMeta(req, res) {
        try {
            const meta = await Models.Meta.findOne({
                where: { page: req.query.page },
            })
            res.send(meta ? meta.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveMeta(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let meta
            let alreadyExists = await Models.Meta.findOne({
                where: { page: req.body.page },
            })

            if (alreadyExists) {
                await alreadyExists.update(req.body)
                meta = alreadyExists
            } else {
                meta = await Models.Meta.create(req.body)
            }

            res.send(meta ? meta.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: '500: Something went wrong!',
            })
        }
    },
    async getBlockInfo(req, res) {
        try {
            const meta = await Models.BlockInfo.findOne({
                where: { page: req.query.page },
            })
            res.send(meta ? meta.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveBlockInfo(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let blockInfo
            let alreadyExists = await Models.BlockInfo.findOne({
                where: { page: req.body.page },
            })

            if (alreadyExists) {
                blockInfo = alreadyExists
                alreadyExists.update(req.body)
            } else {
                blockInfo = await Models.BlockInfo.create(req.body)
            }

            res.send(blockInfo ? blockInfo.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveService(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let service = req.body.slug
                ? await Models.Service.findOne({
                    where: { slug: req.body.slug },
                })
                : null

            if (service) {
                service.update(req.body)
            } else {
                service = await Models.Service.create(req.body)
            }

            res.send(service ? service.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getService(req, res) {
        try {
            let services

            if (req.query.slug) {
                services = await Models.Service.findOne({
                    where: { slug: req.query.slug },
                })

                if (services.description) {
                    services.description = services.description.replace(
                        /<style([\S\s]*?)>([\S\s]*?)<\/style>/gi,
                        ''
                    )
                }

                let gallery = await Models.ImageGallery.findOne({
                    where: {
                        keyword: 'what-we-do-' + services.id,
                    },
                })
                services = services.toJSON()

                if (gallery) {
                    services.gallery = gallery.dataValues.images
                } else {
                    services.gallery = false
                }

                res.send(services)
            } else {
                services = await Models.Service.findAll({
                    raw: true,
                })

                for (let i = 0; i < services.length; i++) {
                    let gallery = await Models.ImageGallery.findOne({
                        where: {
                            keyword: 'what-we-do-' + services[i].id,
                        },
                    })

                    if (gallery) {
                        services[i].gallery = gallery.dataValues.images
                    } else {
                        services[i].gallery = false
                    }
                }

                res.send(services)
            }
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async deleteService(req, res) {
        try {
            await Models.Service.destroy({
                where: { id: req.query.id },
            })
            res.send({})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getHead(req, res) {
        try {
            const meta = await Models.Head.findOne({
                where: { page: req.query.page },
            })
            res.send(meta ? meta.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveHead(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let meta
            let alreadyExists = await Models.Head.findOne({
                where: { page: req.body.page },
            })

            if (alreadyExists) {
                meta = alreadyExists
                alreadyExists.update(req.body)
            } else {
                meta = await Models.Head.create(req.body)
            }

            res.send(meta.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getAboutCompany(req, res) {
        try {
            const meta = await Models.AboutCompany.findOne({
                where: { id: req.query.id },
            })
            res.send(meta ? meta.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveAboutCompany(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let meta
            let alreadyExists = await Models.AboutCompany.findOne({
                where: { id: 1 },
            })

            if (alreadyExists) {
                meta = alreadyExists
                alreadyExists.update(req.body)
            } else {
                meta = await Models.AboutCompany.create(req.body)
            }

            res.send(meta.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getCustomerReview(req, res) {
        try {
            let services

            if (req.body.id) {
                services = await Models.Work.findOne({
                    where: { id: req.body.id },
                })
                res.send(services.toJSON())
            } else {
                services = await Models.Work.findAll({
                    raw: true,
                })

                for (let i = 0; i < services.length; i++) {
                    let gallery = await Models.ImageGallery.findOne({
                        where: {
                            keyword: 'work-' + services[i].id,
                        },
                    })

                    services[i].gallery = gallery.dataValues.images
                }

                res.send(services)
            }
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getGalleryObject(keyword) {
        try {
            return await Models.ImageGallery.findOne({
                where: { keyword },
            })
        } catch (err) {
            console.log(err)
        }
    },
    async saveCustomerReview(req, res) {
        try {
            let service = req.body.id
                ? await Models.CustomerReview.findOne({
                    where: { id: req.body.id },
                })
                : null

            if (service) {
                service.update(req.body)
            } else {
                service = await Models.CustomerReview.create(req.body)
            }

            res.send(service ? service.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getWhyUs(req, res) {
        try {
            let services

            if (req.body.id) {
                services = await Models.WhyUs.findOne({
                    where: { id: req.body.id },
                })
                res.send(services.toJSON())
            } else {
                services = await Models.WhyUs.findAll({
                    raw: true,
                })

                res.send(services)
            }
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveWhyUs(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let service = req.body.id
                ? await Models.WhyUs.findOne({
                    where: { id: req.body.id },
                })
                : null

            if (service) {
                service.update(req.body)
            } else {
                service = await Models.WhyUs.create(req.body)
            }

            res.send(service ? service.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async deleteWhyUs(req, res) {
        try {
            await Models.WhyUs.destroy({
                where: { id: req.query.id },
            })
            res.send({})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getAbout(req, res) {
        try {
            const meta = await Models.About.findOne({
                where: { id: req.query.id },
            })

            if (meta.description) {
                meta.description = meta.description.replace(
                    /<style([\S\s]*?)>([\S\s]*?)<\/style>/gi,
                    ''
                )
            }

            res.send(meta ? meta.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveAbout(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let meta
            let alreadyExists = await Models.About.findOne({
                where: { id: 1 },
            })

            if (alreadyExists) {
                meta = alreadyExists
                alreadyExists.update(req.body)
            } else {
                meta = await Models.About.create(req.body)
            }

            res.send(meta.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getTeam(req, res) {
        try {
            let services

            if (req.body.id) {
                services = await Models.Team.findOne({
                    where: { id: req.body.id },
                })
                res.send(services.toJSON())
            } else {
                services = await Models.Team.findAll({
                    raw: true,
                })

                res.send(services)
            }
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveTeam(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let service = req.body.id
                ? await Models.Team.findOne({
                    where: { id: req.body.id },
                })
                : null

            if (service) {
                service.update(req.body)
            } else {
                service = await Models.Team.create(req.body)
            }

            res.send(service ? service.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async deleteTeam(req, res) {
        try {
            await Models.Team.destroy({
                where: { id: req.query.id },
            })
            res.send({})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getConctactRequest(req, res) {
        try {
            const records = await Models.ContactRequest.findAll({
                raw: true,
                order: [['createdAt', 'DESC']],
            })

            res.send(records)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async readConctactRequest(req, res) {
        try {
            let record = await Models.ContactRequest.findOne({
                where: { id: req.query.id },
            })

            if (record) {
                record.update({
                    readed: true,
                })
            }

            res.send(record ? record.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveConctactRequest(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            const record = await Models.ContactRequest.create(req.body)

            sendMail(req)
            res.send(record ? record.toJSON() : {})
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async saveGallery(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        try {
            let record = await Models.ImageGallery.findOne({
                where: { keyword: req.body.keyword },
            })

            if (record) {
                record.update(req.body)
            } else {
                record = await Models.ImageGallery.create(req.body)
            }

            res.send(record ? record.toJSON() : {})
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async getGallery(req, res) {
        try {
            const records = await Models.ImageGallery.findOne({
                where: { keyword: req.query.keyword },
            })

            res.send(records ? records.toJSON() : {})
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
}
