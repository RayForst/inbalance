const AuthenticationController = require('./controllers/AuthenticationController')
const ProductsController = require('./controllers/ProductsController')
const BlogController = require('./controllers/BlogController')
const StaticPageController = require('./controllers/StaticPageController')
const EventController = require('./controllers/EventController')
const ProductCategoryController = require('./controllers/ProductCategoryController')
const SettingsController = require('./controllers/SettingsController')
const ContactController = require('./controllers/ContactController')
const TranslationsController = require('./controllers/TranslationsController')
const CallMeBackController = require('./controllers/CallMeBackController')
const PartnershipController = require('./controllers/PartnershipController')
const upload = require('./services/fileUploader')
const validation = require('./validation/validation')
const token = require('./validation/token')

module.exports = app => {
    app.get('/admin/call-me-back', token.validate, CallMeBackController.get)
    app.get('/admin/partnership', token.validate, PartnershipController.get)
    app.post('/call-me-back', CallMeBackController.save)
    app.post('/partnership', PartnershipController.save)

    app.post('/contact-request', ContactController.saveContactRequest)
    app.get('/translations', TranslationsController.get)
    app.post('/translations/save', TranslationsController.save)
    app.get(
        '/admin/contact-request',
        token.validate,
        ContactController.getContactRequest
    )

    app.post('/subscribe', ContactController.save)
    app.get(
        '/admin/subscribe/event',
        token.validate,
        ContactController.getEvent
    )
    app.post('/subscribe/event', ContactController.saveEvent)
    app.get('/admin/subscribe', token.validate, ContactController.get)

    app.post('/admin/login', validation.login, AuthenticationController.login)

    // settings
    app.get('/settings', SettingsController.get)
    app.post('/admin/settings', token.validate, SettingsController.update)
    app.get('/admin/settings', token.validate, SettingsController.get)
    app.get('/settings/priority', SettingsController.getPriority)
    app.post(
        '/admin/settings/priority',
        token.validate,
        SettingsController.updatePriority
    )

    // static pages
    app.get('/static', StaticPageController.getBySlug)
    app.get('/statics', StaticPageController.get)
    app.get('/static/menu', StaticPageController.getMenu)
    app.get('/admin/statics', token.validate, StaticPageController.get)
    app.post(
        '/admin/static',
        token.validate,
        validation.static,
        StaticPageController.save
    )
    app.post(
        '/admin/static/edit',
        token.validate,
        validation.static,
        StaticPageController.edit
    )
    app.delete('/admin/static', token.validate, StaticPageController.remove)

    // articles
    app.get('/article', BlogController.getBySlug)
    app.get('/articles', BlogController.get)
    app.get('/articles/recent', BlogController.getRecent)
    app.get('/admin/articles', token.validate, BlogController.get)
    app.post(
        '/admin/article',
        token.validate,
        validation.article,
        BlogController.save
    )
    app.post(
        '/admin/article/edit',
        token.validate,
        validation.article,
        BlogController.edit
    )
    app.delete('/admin/article', token.validate, BlogController.remove)

    // events
    app.get('/event', EventController.getBySlug)
    app.get('/events', EventController.get)
    app.get('/events/hero', EventController.getHero)
    app.get('/events/announce', EventController.getAnnounce)
    app.get('/admin/events', token.validate, EventController.getAdmin)
    app.post(
        '/admin/events',
        token.validate,
        validation.event,
        EventController.save
    )
    app.post(
        '/admin/events/edit',
        token.validate,
        validation.event,
        EventController.edit
    )
    app.delete('/admin/event', token.validate, EventController.remove)

    // products
    app.get('/products', ProductsController.get)
    app.get('/products/description', ProductsController.getCategoryDesc)
    app.get('/product', ProductsController.getBySlug)
    app.get('/admin/products', token.validate, ProductsController.getAdmin)
    app.get('/products/priority', ProductsController.getByPriority)
    app.post(
        '/admin/product',
        token.validate,
        validation.product,
        ProductsController.save
    )
    app.post(
        '/admin/product/edit',
        token.validate,
        validation.product,
        ProductsController.edit
    )
    app.delete('/admin/product', token.validate, ProductsController.remove)

    // product categories
    app.get('/categories', ProductCategoryController.get)
    app.post(
        '/admin/categories',
        token.validate,
        ProductCategoryController.update
    )
    app.get(
        '/categories/subcategories',
        ProductCategoryController.getSubcategory
    )
    app.post(
        '/admin/categories/subcategories',
        token.validate,
        ProductCategoryController.saveSubcategory
    )
    app.post(
        '/admin/categories/subcategories/edit',
        token.validate,
        ProductCategoryController.editSubcategory
    )
    app.post(
        '/admin/categories/subcategories-remove',
        token.validate,
        ProductCategoryController.removeSubcategory
    )

    app.post('/upload', upload.single('file'), (req, res) => {
        res.json({ file: req.file })
    })
    app.post('/upload-editor', upload.single('file'), (req, res) => {
        res.send('200', `/uploads/${req.file.filename}`)
    })
}
