const { check } = require('express-validator/check')

module.exports = {
    login: [
        check('login')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 255 })
            .withMessage('Should be max 255 chars long'),
        check('password')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 255 })
            .withMessage('Should be max 255 chars long'),
    ],
    event: [
        check('name')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 255 })
            .withMessage('Should be max 255 chars long'),
        check('image')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty'),
        check('description')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 3000 })
            .withMessage('Should be max 3000 chars long'),
    ],
    product: [
        check('name')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 255 })
            .withMessage('Should be max 255 chars long'),
        check('images')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty'),
        check('description')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 3000 })
            .withMessage('Should be max 3000 chars long'),
    ],
    article: [
        check('name')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 255 })
            .withMessage('Should be max 255 chars long'),
        check('image')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty'),
        check('text')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 3000 })
            .withMessage('Should be max 3000 chars long'),
    ],
    static: [
        check('name')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 255 })
            .withMessage('Should be max 255 chars long'),
        check('image')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty'),
        check('text')
            .isLength({ min: 1 })
            .withMessage('Cannot be empty')
            .isLength({ max: 3000 })
            .withMessage('Should be max 3000 chars long'),
    ],
}
