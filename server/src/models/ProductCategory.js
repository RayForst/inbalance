const slugify = require('slugify')

let createSlug = product => {
    console.log('CREATE SLUG LALALALALLALALALAL')
    product.slug = slugify(product.name)
}

module.exports = (sequelize, DataTypes) =>
    sequelize
        .define('ProductCategory', {
            name: {
                type: DataTypes.STRING,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
