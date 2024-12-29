const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middelware/isAuthenticated')

const auth = require('./auth')
const citas = require('./citas')

router.get('/error-404', (req, res)=>{
    res.render('error-404')
})
router.use('/auth', auth)
router.use('/', isAuthenticated)

router.use('/citas', citas)


module.exports = router