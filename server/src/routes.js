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

module.exports = app => {
    app.get('/admin/call-me-back', CallMeBackController.get)
    app.get('/admin/partnership', PartnershipController.get)
    app.post('/call-me-back', CallMeBackController.save)
    app.post('/partnership', PartnershipController.save)

    app.post('/contact-request', ContactController.saveContactRequest)
    app.get('/translations', TranslationsController.get)
    app.post('/translations/save', TranslationsController.save)
    app.get('/admin/contact-request', ContactController.getContactRequest)

    app.post('/subscribe', ContactController.save)
    app.get('/admin/subscribe/event', ContactController.getEvent)
    app.post('/subscribe/event', ContactController.saveEvent)
    app.get('/admin/subscribe', ContactController.get)

    app.post('/admin/login', validation.login, AuthenticationController.login)

    // settings
    app.get('/settings', SettingsController.get)
    app.post('/admin/settings', SettingsController.update)
    app.get('/admin/settings', SettingsController.get)
    app.get('/settings/priority', SettingsController.getPriority)
    app.post('/admin/settings/priority', SettingsController.updatePriority)

    // static pages
    app.get('/static', StaticPageController.getBySlug)
    app.get('/statics', StaticPageController.get)
    app.get('/static/menu', StaticPageController.getMenu)
    app.get('/admin/statics', StaticPageController.get)
    app.post('/admin/static', validation.static, StaticPageController.save)
    app.post('/admin/static/edit', validation.static, StaticPageController.edit)
    app.delete('/admin/static', StaticPageController.remove)

    // articles
    app.get('/article', BlogController.getBySlug)
    app.get('/articles', BlogController.get)
    app.get('/articles/recent', BlogController.getRecent)
    app.get('/admin/articles', BlogController.get)
    app.post('/admin/article', validation.article, BlogController.save)
    app.post('/admin/article/edit', validation.article, BlogController.edit)
    app.delete('/admin/article', BlogController.remove)

    // events
    app.get('/event', EventController.getBySlug)
    app.get('/events', EventController.get)
    app.get('/events/hero', EventController.getHero)
    app.get('/events/announce', EventController.getAnnounce)
    app.get('/admin/events', EventController.getAdmin)
    app.post('/admin/events', validation.event, EventController.save)
    app.post('/admin/events/edit', validation.event, EventController.edit)
    app.delete('/admin/event', EventController.remove)

    // products
    app.get('/products', ProductsController.get)
    app.get('/products/description', ProductsController.getCategoryDesc)
    app.get('/product', ProductsController.getBySlug)
    app.get('/admin/products', ProductsController.getAdmin)
    app.get('/products/priority', ProductsController.getByPriority)
    app.post('/admin/product', validation.product, ProductsController.save)
    app.post('/admin/product/edit', validation.product, ProductsController.edit)
    app.delete('/admin/product', ProductsController.remove)

    // product categories
    app.get('/categories', ProductCategoryController.get)
    app.post('/admin/categories', ProductCategoryController.update)
    app.get(
        '/categories/subcategories',
        ProductCategoryController.getSubcategory
    )
    app.post(
        '/admin/categories/subcategories',
        ProductCategoryController.saveSubcategory
    )
    app.post(
        '/admin/categories/subcategories/edit',
        ProductCategoryController.editSubcategory
    )
    app.post(
        '/admin/categories/subcategories-remove',
        ProductCategoryController.removeSubcategory
    )

    app.post('/upload', upload.single('file'), (req, res) => {
        res.json({ file: req.file })
    })
    app.post('/upload-editor', upload.single('file'), (req, res) => {
        res.send('200', `/uploads/${req.file.filename}`)
    })
}
