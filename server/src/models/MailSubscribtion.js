module.exports = (sequelize, DataTypes) =>
    sequelize.define('Subscribtion', {
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
    })
