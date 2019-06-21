module.exports = (sequelize, DataTypes) =>
    sequelize.define('EventSubscribtion', {
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    })
