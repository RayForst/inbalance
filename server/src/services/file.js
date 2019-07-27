module.exports = function(err, req, res, next) {
    if (err.code === 'LIMIT_FILE_TYPES') {
        return res.status(422).json({ error: 'Only images are allowed' })
    }

    next()
}
