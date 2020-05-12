require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongo = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')(session)

// DATABASE CONNECTION
mongo.connect('mongodb://localhost/rebarbora', {
     useNewUrlParser: true, 
     useUnifiedTopology: true 
});
const db = mongo.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database...'));


// SET PROPERTIES   
require('./middleware/passport')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongo.connection
    }),
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.title = 'Zdravá výživa'
    res.locals.activeLink = ''
    res.locals.cart = req.session.cart || {}
    res.locals.isLoggedIn = req.isAuthenticated()
    res.locals.isAdminLoggedIn = (req.isAuthenticated()) ? req.user.isAdmin : false
    res.locals.userName = (req.isAuthenticated()) ? `${req.user.firstName} ${req.user.surName}` : null
    res.locals.successMsg = req.flash('success')[0]
    next()
})

// ROUTES
const indexRouter = require('./routes/indexRouter')
app.use('/', indexRouter)

const shopRouter = require('./routes/shopRouter')
app.use('/obchod', shopRouter)

const userRouter = require('./routes/userRouter')
app.use('/ucet', userRouter)

const blogRouter = require('./routes/blogRouter')
app.use('/blog', blogRouter)

const newsRouter = require('./routes/newsRouter')
app.use('/novinky', newsRouter)

const testRouter = require('./routes/testRouter')
app.use('/test', testRouter)

app.use((req, res, next) => { // handle 404 status
    res.status(404)
    res.redirect('/')
});


// RUN SERVER ON PORT
app.listen(port, () => console.log('Server is running on: ' + port))