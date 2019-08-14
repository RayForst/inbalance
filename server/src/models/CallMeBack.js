module.exports = (sequelize, DataTypes) =>
    sequelize.define('CallMeBack', {
        phone: {
            type: DataTypes.STRING,
        },
        userLang: {
            type: DataTypes.STRING,
        },
    })
