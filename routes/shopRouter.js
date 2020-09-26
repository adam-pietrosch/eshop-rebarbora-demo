const express = require('express')
const router = express.Router()
const protection = require('csurf')()
const Product = require('../models/product')
const Cart = require('../models/cart')


// router.use(protection)

// PUBLIC ROUTES
router.get('/', async (req, res) => {
    const products = await Product.find()
    res.render('shop/shopIndex', {
        products
    })
})

router.get('/kosik', (req, res) => {
    if (!req.session.cart) return res.render('shop/shoppingCart', {
        products: null
    })
    const cart = new Cart(req.session.cart)
    if (cart.totalQty === 0) {
        req.session.cart = null
        return res.render('shop/shoppingCart', {
            products: null
        })
    }
    const products = cart.generateArray()
    res.render('shop/shoppingCart', {
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




module.exports = router