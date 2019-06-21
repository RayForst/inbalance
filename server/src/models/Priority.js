module.exports = (sequelize, DataTypes) =>
    sequelize.define('Priority', {
        priorityOnMain: {
            type: DataTypes.INTEGER,
        },
    })
