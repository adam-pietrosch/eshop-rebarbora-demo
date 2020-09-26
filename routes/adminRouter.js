const express = require('express')
const router = express.Router()
const multer = require('multer')
const slugify = require('slugify')
const Product = require('../models/product')

// SETUP IMAGE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploadImg = multer({ storage: storage })


// PROTECT ALL ROUTES
function isAdminLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isAdmin) return next()
    }
    res.redirect('/ucet/prihlasit')
}
router.use(isAdminLoggedIn)


// ADMIN ROUTES

router.get('/', (req, res) => {
    res.render('admin/dashboard', {

    })
})

// shop routes
router.get('/novy-produkt', (req, res) => {
    res.render('admin/addProduct', {

    })
})

router.post('/novy-produkt', uploadImg.single('img'), async (req, res) => {
    console.log(req.file)
    const product = new Product({
        title: req.body.title,
        slug: slugify(req.body.title, { lower: true }),
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        price: req.body.price,
        imgPath: '/img/' + req.file.originalname
    })
    await product.save()
    console.log(product)
    req.flash('success', `${product.title} - uloženo`)
    res.redirect('/admin/novy-produkt')
})

router.get('/upravit-produkt/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
    res.render('admin/editProduct', {
        product
    })
})

router.post('/upravit-produkt/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
    console.log(req.body)
    const newValues = {
        $set: {
            title: req.body.title,
            slug: slugify(req.body.title, { lower: true }),
            price: req.body.price,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription
        }
    };
    await Product.updateOne(product, newValues)
    const updatedSlug = slugify(req.body.title, { lower: true })

    req.flash('success', `${req.body.title} - aktualizováno`)
    res.redirect(`/admin/upravit/${updatedSlug}`)
})

// chat routes
router.get('/chat', (req, res) => {
    const xff = req.headers['x-forwarded-for']
    const ip = xff ? xff.split(',')[0] : req.connection.remoteAddress

    console.log(ip)

    res.render('admin/adminChat')
})





module.exports = router