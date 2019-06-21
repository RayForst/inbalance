module.exports = (sequelize, DataTypes) =>
    sequelize.define('ContactRequest', {
        fullname: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
        },
    })
