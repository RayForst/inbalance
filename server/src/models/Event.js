const slugify = require('slugify')

let createSlug = product => {
    product.slug = slugify(product.name)
}

module.exports = (sequelize, DataTypes) =>
    sequelize
        .define('Event', {
            name: {
                type: DataTypes.STRING,
            },
            caption: {
                type: DataTypes.STRING,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
            description: {
                type: DataTypes.TEXT,
            },
            image: {
                type: DataTypes.TEXT,
            },
            images: {
                type: DataTypes.TEXT,
            },
            dateStart: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            dateEnd: {
                type: DataTypes.DATE,
            },
            priority: {
                type: DataTypes.BOOLEAN,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
