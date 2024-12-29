const express = require('express');
const router = express.Router();
const isAdmin = require('../middelware/isAdmin')
const isEmployer = require('../middelware/isEmployer')

router.get('/', (req, res)=>{
    if(req.user.role === 'ADMIN'){
        return res.redirect('/citas/admin')
    }else if(req.user.role === 'EMPLOYER'){
        return res.redirect('/citas/employer')
    }else{
        return res.redirect('/error-404')
    }
})
router.get('/admin', isAdmin, (req, res)=>{
    res.json({mensaje: "Admin"})
})
router.get('/employer', isEmployer, (req,res)=>{
    res.json({mensaje: "Employer"})
})

router.get('/create', async(req, res)=>{
    
})

module.exports = router