const express = require('express')
const router = express.Router()
const protection = require('csurf')()
const multer = require('multer');
const slugify = require('slugify')
const Product = require('../models/product')
const Cart = require('../models/cart')


// router.use(protection)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadImg = multer({ storage: storage })


// PUBLIC ROUTES
router.get('/', async (req, res) => {
    const products = await Product.find()
    res.render('shop/shopIndex', {
        activeLink: 'obchod',
        products
    })
})

router.get('/kosik', (req, res) => {
    if (!req.session.cart) return res.render('shop/shoppingCart', {
        activeLink: 'kosik',
        products: null
    })
    const cart = new Cart(req.session.cart)
    if (cart.totalQty === 0) {
        req.session.cart = null
        return res.render('shop/shoppingCart', {
            activeLink: 'kosik',
            products: null
        })
    }
    const products = cart.generateArray()
    res.render('shop/shoppingCart', {
        activeLink: 'kosik',
        products
    })
})

router.get('/kosik-qty', (req, res) => {
    // AJAX
    if (!req.session.cart) return res.send(null)
    const cart = new Cart(req.session.cart)   
    console.log('here i am')
    console.log(cart.totalQty)
    res.send(cart.totalQty)
})

router.get('/pridat-do-kosiku/:id', async (req, res) => {
    // AJAX
    const product = await Product.findById(req.params.id)
    const oldCart = req.session.cart || {}
    const cart = new Cart(oldCart)
    cart.addItem(product)
    req.session.cart = cart
    console.log(req.session.cart)
    res.json({ 
        productTitle: product.title,
        cartQty: cart.totalQty
    })
})

router.get('/odstranit-z-kosiku/:id', (req, res) => {
    if (!req.session.cart) return res.redirect('/obchod/kosik')
    const cart = new Cart(req.session.cart)
    cart.removeItem(req.params.id)
    req.session.cart = cart
    res.redirect('/obchod/kosik')
})

router.get('/zvysit-mnozstvi/:id', (req, res) => {
    if (!req.session.cart) return res.redirect('/obchod/kosik')
    const cart = new Cart(req.session.cart)
    cart.increaseItemQty(req.params.id)
    req.session.cart = cart
    res.redirect('/obchod/kosik')
})

router.get('/snizit-mnozstvi/:id', (req, res) => {
    if (!req.session.cart) return res.redirect('/obchod/kosik')
    const cart = new Cart(req.session.cart)
    cart.reduceItemQty(req.params.id)
    req.session.cart = cart    
    res.redirect('/obchod/kosik')
})


// ADMIN ROUTES
router.get('/pridat', isAdminLoggedIn, (req, res) => {
    res.render('shop/addProduct', { 
          
    })
})

router.post('/pridat', isAdminLoggedIn, uploadImg.single('img'), async (req, res) => {
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
    res.redirect('/obchod/pridat')
})

router.get('/upravit/:slug', isAdminLoggedIn, async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
    res.render('shop/editProduct', {
        product
    })
})

router.post('/upravit/:slug', isAdminLoggedIn, async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
    console.log(req.body)
    const newValues = { $set: { 
        title: req.body.title, 
        slug: slugify(req.body.title, { lower: true }),
        price: req.body.price,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription 
    } };
    await Product.updateOne(product, newValues)
    const updatedSlug = slugify(req.body.title, { lower: true })
    
    req.flash('success', `${req.body.title} - aktualizováno`)
    res.redirect(`/obchod/upravit/${updatedSlug}`)
})


// PROTECT ROUTES
function isAdminLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isAdmin) return next()
    }
    res.redirect('/obchod')
}



module.exports = router