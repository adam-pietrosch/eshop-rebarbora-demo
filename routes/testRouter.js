const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')

router.get('/db/products', async (req, res) => {
    const data = await Product.find()
    res.json(data)
    console.log(data)
})
router.get('/db/users', async (req, res) => {
    const data = await User.find()
    res.json(data)
    console.log(data)
})
router.get('/db/delete/products', async (req, res) => {
    res.json(await Product.deleteMany())
})
router.get('/db/delete/users', async (req, res) => {
    res.json(await User.deleteMany())
})


module.exports = router