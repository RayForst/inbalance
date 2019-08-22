const slugify = require('slugify')

let createSlug = product => {
    product.slug = slugify(product.name)
}

module.exports = (sequelize, DataTypes) =>
    sequelize
        .define('ProductLine', {
            name: {
                type: DataTypes.STRING,
            },
            name_ru: {
                type: DataTypes.STRING,
            },
            name_lv: {
                type: DataTypes.STRING,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
