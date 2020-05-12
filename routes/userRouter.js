const express = require('express')
const router = express.Router()
const protection = require('csurf')()
const passport = require('passport')
const Product = require('../models/product')
const User = require('../models/user')

router.use(protection)

router.get('/prihlasit', isLoggedOut, (req, res) => {
    const errors = req.flash('error')
    const postedData = req.flash('postedData')[0]
    const isWrongEmail = errors.includes('Špatný email.')
    const isWrongPassword = errors.includes('Špatné heslo.')
    res.render('user/login', {
        csrfToken: req.csrfToken(),
        errors,
        postedData,
        isWrongEmail,
        isWrongPassword
    })
})

router.post('/prihlasit', isLoggedOut, passport.authenticate('local.login', {
    successRedirect: '/ucet/profil',
    failureRedirect: '/ucet/prihlasit',
    failureFlash: true
}))

router.get('/registrovat', isLoggedOut, (req, res) => {
    const errors = req.flash('error')
    const postedData = req.flash('postedData')[0]
    const isWrongEmail = errors.includes('Email je zabraný.')

    res.render('user/register', {
        errors,
        csrfToken: req.csrfToken(),
        postedData,
        isWrongEmail
    })
})

router.post('/registrovat', isLoggedOut, passport.authenticate('local.register', {
    successRedirect: '/ucet/profil',
    failureRedirect: '/ucet/registrovat',
    failureFlash: true
}))

router.get('/registrovat-admin', isLoggedOut, (req, res) => {
    const errors = req.flash('error')
    const postedData = req.flash('postedData')[0]
    const isWrongEmail = errors.includes('Email je zabraný.')
    const isWrongAdminKey = errors.includes('Špatný admin klíč.')
    res.render('user/registerAdmin', {
        errors,
        csrfToken: req.csrfToken(),
        postedData,
        isWrongEmail,
        isWrongAdminKey
    })
})

router.post('/registrovat-admin', isLoggedOut, passport.authenticate('local.registerAdmin', {
    successRedirect: '/ucet/profil',
    failureRedirect: '/ucet/registrovat-admin',
    failureFlash: true
}))

router.get('/profil', isLoggedIn, (req, res) => {
    res.render('user/profile', {
    })
})

router.get('/odhlasit', isLoggedIn, (req, res) => {
    req.logOut()
    res.redirect('/')
})


// PROTECT ROUTES
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/ucet/prihlasit')
}

function isLoggedOut(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/ucet/profil')
    next()
}


module.exports = router