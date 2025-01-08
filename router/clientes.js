const prisma = require('../prisma/prisma')
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        
        const citas = await prisma.cita.findMany();
    
        res.render('inicio',{
            citas: citas,
            user: req.user.role === 'ADMIN' ? true : false
        })
    } catch (error) {
        console.error(`El error es ${error}`)
        res.status(500).redirect('/error-404')
    }
})

module.exports = router