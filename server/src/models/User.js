const Prom2 = require('bluebird')
const bcrypt = Prom2.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING,
            },
            login: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: DataTypes.STRING,
        },
        {
            hooks: {
                beforeSave: hashPassword,
            },
        }
    )

    User.prototype.comparePassword = function(password) {
        return bcrypt.compareAsync(password, this.password)
    }

    return User
}
