const express = require('express')
const router = express.Router()

const auth = require('./auth')
const citas = require('./citas')

router.use('/auth', auth)
router.use('/citas', citas)

module.exports = router