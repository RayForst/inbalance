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
            images: {
                type: DataTypes.TEXT,
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
            howtouse: {
                type: DataTypes.TEXT,
            },
            howtouse_ru: {
                type: DataTypes.TEXT,
            },
            howtouse_lv: {
                type: DataTypes.TEXT,
            },
            ingridients: {
                type: DataTypes.TEXT,
            },
            ingridients_ru: {
                type: DataTypes.TEXT,
            },
            ingridients_lv: {
                type: DataTypes.TEXT,
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
            priority: {
                type: DataTypes.BOOLEAN,
            },
            price: {
                type: DataTypes.DECIMAL,
            },
            totalCount: {
                type: DataTypes.INTEGER,
            },
            isNew: {
                type: DataTypes.BOOLEAN,
            },
            show: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
// price
// quantity
// new product