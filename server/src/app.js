const CONFIG = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const models = require('./models')
const expressValidator = require('express-validator')
const log = require('./services/logger')
const fileValidator = require('./services/file')
const app = express()

log('SERVER', 'Starting', '...')

app.use(cookieParser())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())
app.use('/img', express.static(__dirname + '/../../uploads'))
app.use(fileValidator)

require('./routes')(app)
require('./commands')(app)

log('SERVER', 'Database', 'DB Synchronization try...')

models.sequelize.sync().then(() => {
    log('SERVER', 'Database', 'DB Synchronization successfuly complete!')
    app.listen(
        CONFIG.port,
        log('SERVER', 'Runing', `http://localhost:${CONFIG.port}/`)
    )
})
