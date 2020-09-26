const passport = require('passport')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')


// SAVE USER TO SESSION
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// REMOVE USER FROM SESSION
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

// REGISTER NEW USER
passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    req.flash('postedData', req.body)
    const user = await User.findOne({ email: email })
    if (user) {
        return done(null, false, { message: 'Email je zabraný.' })
    }
    var newUser = new User()
    newUser.firstName = req.body.firstName
    newUser.surName = req.body.surName
    newUser.email = email
    newUser.password = await bcrypt.hash(password, 5)
    newUser.isAdmin = false
    const createdUser = await newUser.save()
    return done(null, createdUser)
}
))

// REGISTER NEW ADMIN
passport.use('local.registerAdmin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    req.flash('postedData', req.body)
    const user = await User.findOne({ email: email })
    if (user) {
        return done(null, false, { message: 'Email je zabraný.' })
    }
    const rightKey = process.env.ADMIN_SECRET === req.body.adminKey
    if (!rightKey) {
        return done(null, false, { message: 'Špatný admin klíč.'})
    }
    var newUser = new User()
    newUser.firstName = req.body.firstName
    newUser.surName = req.body.surName
    newUser.email = email
    newUser.password = await bcrypt.hash(password, 5)
    newUser.isAdmin = true
    const createdUser = await newUser.save()
    return done(null, createdUser)
}
))

// LOGIN USER
passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    req.flash('postedData', req.body)
    const user = await User.findOne({ email: email })
    if (user == null) {
        return done(null, false, { message: 'Špatný email.' })
    }
    const isPassValid = await bcrypt.compare(password, user.password)
    if (!isPassValid) {
        return done(null, false, { message: 'Špatné heslo.' })
    }
    return done(null, user)
}
))