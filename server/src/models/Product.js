const slugify = require('slugify')

let createSlug = product => {
    product.slug = slugify(product.name)
}

module.exports = (sequelize, DataTypes) =>
    sequelize
        .define('Product', {
            name: {
                type: DataTypes.STRING,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
            images: {
                type: DataTypes.TEXT,
            },
            description: {
                type: DataTypes.TEXT,
            },
            howtouse: {
                type: DataTypes.TEXT,
            },
            ingridients: {
                type: DataTypes.TEXT,
            },
            priority: {
                type: DataTypes.BOOLEAN,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
