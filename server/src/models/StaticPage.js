const slugify = require('slugify')

let createSlug = product => {
    product.slug = slugify(product.name)
}

module.exports = (sequelize, DataTypes) =>
    sequelize
        .define('StaticPage', {
            name: {
                type: DataTypes.STRING,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
            image: {
                type: DataTypes.TEXT,
            },
            text: {
                type: DataTypes.TEXT,
            },
            menupos: {
                type: DataTypes.INTEGER,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
