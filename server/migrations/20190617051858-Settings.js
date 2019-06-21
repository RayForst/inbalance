'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Settings', [
            {
                email: 'hello@inbalans.lv',
                contactFormEmail: 'sergeikalpakov@gmail.com',
                contactFormSubject: 'contact form request',
                lat: '56.950340',
                long: '24.124430',
                phone: '22 18 21 88',
                address: 'Marijas iela 13 k-4',
                copyright: 'inbalans, 2015-',
                facebook: 'https://www.facebook.com/inbalans.riga/',
                instagram:
                    'https://www.instagram.com/explore/locations/554800261352863/inbalans-riga/',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    },
}
