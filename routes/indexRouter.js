const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {
        activeLink: 'uvod'
    })
})

module.exports = router