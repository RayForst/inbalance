module.exports = (sequelize, DataTypes) =>
    sequelize.define('PartnershipRequest', {
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
