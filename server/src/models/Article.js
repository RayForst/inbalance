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
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
            image: {
                type: DataTypes.STRING,
            },
            text: {
                type: DataTypes.TEXT,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
