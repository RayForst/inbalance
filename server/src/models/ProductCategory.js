const slugify = require('slugify')

let createSlug = product => {
    product.slug = slugify(product.name)
}

module.exports = (sequelize, DataTypes) =>
    sequelize
        .define('ProductCategory', {
            name: {
                type: DataTypes.STRING,
            },
            name_ru: {
                type: DataTypes.STRING,
            },
            name_lv: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            description_ru: {
                type: DataTypes.TEXT,
            },
            description_lv: {
                type: DataTypes.TEXT,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
            metatitle: {
                type: DataTypes.STRING,
            },
            metadesc: {
                type: DataTypes.TEXT,
            },
            metatitle_lv: {
                type: DataTypes.STRING,
            },
            metadesc_lv: {
                type: DataTypes.TEXT,
            },
            metatitle_ru: {
                type: DataTypes.STRING,
            },
            metadesc_ru: {
                type: DataTypes.TEXT,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
