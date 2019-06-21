module.exports = (sequelize, DataTypes) =>
    sequelize.define('Settings', {
        email: {
            type: DataTypes.STRING,
        },
        contactFormEmail: {
            type: DataTypes.STRING,
        },
        contactFormSubject: {
            type: DataTypes.STRING,
        },
        lat: {
            type: DataTypes.STRING,
        },
        long: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        copyright: {
            type: DataTypes.STRING,
        },
        facebook: {
            type: DataTypes.STRING,
        },
        instagram: {
            type: DataTypes.STRING,
        },
    })
