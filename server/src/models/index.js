const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../config')

let db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

db['ProductCategory'].hasMany(db['ProductSubcategory'], {
    foreignKey: 'ProductCategoryId',
})
db['ProductSubcategory'].belongsTo(db['ProductCategory'], {
    foreignKey: 'ProductCategoryId',
})

db['ProductSubcategory'].hasMany(db['Product'], {
    foreignKey: 'ProductSubcategoryId',
})
db['Product'].belongsTo(db['ProductSubcategory'], {
    foreignKey: 'ProductSubcategoryId',
})

db['EventSubscribtion'].belongsTo(db['Event'], {
    foreignKey: 'SubId',
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
