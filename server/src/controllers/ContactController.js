const Models = require('../models')
const { validationResult } = require('express-validator/check')
const Model = Models.Event
const Sequelize = require('sequelize')
const Email = require('../services/sendEmail')

const Op = Sequelize.Op

module.exports = {
    async save(req, res) {
        try {
            const event = await Models.Subscribtion.create(req.body)
            res.send(event.toJSON())
        } catch (err) {
            res.status(400).send({
                error: err.errors[0].type,
            })
        }
    },
    async saveContactRequest(req, res) {
        try {
            const event = await Models.ContactRequest.create(req.body)

            Email.send(
                'Contact request!',
                `<div>Client Fullname: ${req.body.fullname}</div>
                <div>Client Email: ${req.body.email}</div>
                <div>Client Text: ${req.body.text}</div>`
            )

            res.send(event.toJSON())
        } catch (err) {
            res.status(400).send({
                error: err.errors[0].type,
            })
        }
    },
    async getContactRequest(req, res) {
        try {
            const result = await Models.ContactRequest.findAll({
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
    async getCheckouts(req, res) {
        try {
            const result = await Models.Checkouts.findAll({
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
    async saveEvent(req, res) {
        try {
            const event = await Models.EventSubscribtion.create(req.body)

            Email.send(
                'Event subscription!',
                `<div>Client Fullname: ${req.body.firstname} ${req.body.lastname}</div>
                <div>Client Phone: ${req.body.phone}</div>
                <div>Client Email: ${req.body.email}</div>`
            )

            res.send(event.toJSON())
        } catch (err) {
            res.status(400).send({
                error: err.errors[0].type,
            })
        }
    },
    async getEvent(req, res) {
        try {
            const result = await Models.EventSubscribtion.findAll({
                raw: true,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Models.Event,
                        attributes: ['id', 'slug', 'name'],
                    },
                ],
            })

            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Something went wrong' + err,
            })
        }
    },
    async get(req, res) {
        try {
            const result = await Models.Subscribtion.findAll({
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
