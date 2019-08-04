const slugify = require('slugify')

let createSlug = product => {
    product.slug = slugify(product.name)
}

module.exports = (sequelize, DataTypes) =>
    sequelize
        .define('Article', {
            name: {
                type: DataTypes.STRING,
            },
            name_lv: {
                type: DataTypes.STRING,
            },
            name_ru: {
                type: DataTypes.STRING,
            },
            text: {
                type: DataTypes.TEXT,
            },
            text_lv: {
                type: DataTypes.TEXT,
            },
            text_ru: {
                type: DataTypes.TEXT,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
            image: {
                type: DataTypes.STRING,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
