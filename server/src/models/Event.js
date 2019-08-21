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
            description: {
                type: DataTypes.TEXT,
            },
            name_lv: {
                type: DataTypes.STRING,
            },
            caption_lv: {
                type: DataTypes.STRING,
            },
            description_lv: {
                type: DataTypes.TEXT,
            },
            name_ru: {
                type: DataTypes.STRING,
            },
            caption_ru: {
                type: DataTypes.STRING,
            },
            description_ru: {
                type: DataTypes.TEXT,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
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
            preview: {
                type: DataTypes.BOOLEAN,
            },
            show: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        })
        .beforeCreate(createSlug)
        .beforeUpdate(createSlug)
