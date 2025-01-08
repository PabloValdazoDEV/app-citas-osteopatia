const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middelware/isAuthenticated')

const auth = require('./auth')
const citas = require('./citas')
const clientes = require('./clientes')

router.get('/error-404', (req, res)=>{
    res.render('error-404')
})
router.use('/', auth)
router.use('/', isAuthenticated)

router.use('/citas', citas)
router.use('/clientes', clientes)


module.exports = router