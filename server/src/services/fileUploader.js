const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '/../../../uploads'))
    },
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            cb(
                null,
                raw.toString('hex') +
                    Date.now() +
                    path.extname(file.originalname)
            )
        })
    },
})

module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024,
        fieldSize: 3 * 1024 * 1024,
    },
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            const error = new Error('Only image files are allowed!')
            error.code = 'LIMIT_FILE_TYPES'

            return cb(error, false)
        }
        cb(null, true)
    },
})
