'use strict'

const slugify = require('slugify')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'ProductCategories',
            [
                {
                    name: '[comfort-zone]',
                    slug: slugify('[comfort-zone]'),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: '/skin regimen/',
                    slug: slugify('/skin regimen/'),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'WELLNESS ТОВАРЫ',
                    slug: slugify('WELLNESS ТОВАРЫ'),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {
                individualHooks: true,
                hooks: true,
                validate: true,
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return null
    },
}
