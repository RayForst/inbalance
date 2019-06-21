const CONFIG = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const i18n = require('i18n')
const cookieParser = require('cookie-parser')
import models from './models'
const expressValidator = require('express-validator')
const log = require('./services/logger')
const app = express()

log('SERVER', 'Starting', '...')

i18n.configure({
    // setup some locales - other locales default to en silently
    locales: ['en', 'ru', 'lv'],

    // sets a custom cookie name to parse locale settings from
    cookie: 'lang-cookie',
    updateFiles: false,

    // where to store json files - defaults to './locales'
    directory: __dirname + '/locales',
})

// you will need to use cookieParser to expose cookies to req.cookies
app.use(cookieParser())

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())
app.use('/img', express.static(__dirname + '/../../uploads'))

app.use(function(err, req, res, next) {
    if (err.code === 'LIMIT_FILE_TYPES') {
        return res.status(422).json({ error: 'Only images are allowed' })
    }

    next()
})

require('./routes')(app)

log('SERVER', 'Database', 'Synchronization...')

models.sequelize
    .sync({
        logging: console.log,
    })
    .then(() => {
        log('SERVER', 'Database', 'Synchronization successfuly complete!')
        app.listen(
            CONFIG.port,
            log('SERVER', 'Runing', `http://localhost:${CONFIG.port}/`)
        )
    })
