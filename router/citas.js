const express = require('express');
const router = express.Router();
const isAdmin = require('../middelware/isAdmin')
const isEmployer = require('../middelware/isEmployer')
const prisma = require('../prisma/prisma')
const isAdminOrEmployer = require('../middelware/isAdminOrEmployer')

router.get('/', (req, res)=>{

    try {
        if(req.user.role === 'ADMIN' || req.user.role === 'EMPLOYER'){
            return res.redirect('/citas/inicio')
        }else {
            return res.redirect('/error-404')
        } 
        
    } catch (error) {
        console.error(`El error es ${error}`)
        res.status(500).redirect('/error-404')
    }
})

router.get('/inicio', isAdminOrEmployer, async (req, res)=>{
    try {
        
        const citas = await prisma.cita.findMany({});
        res.render('inicio',{
            citas: citas,
            user: req.user.role === 'ADMIN' ? true : false
        })
    } catch (error) {
        console.error(`El error es ${error}`)
        res.status(500).redirect('/error-404')
    }
})

router.get('/employer', isEmployer, async(req,res)=>{
    try {
        const citas = await prisma.cita.findMany({});
        res.render('inicio',{
            citas: citas,
            user: req.user === 'ADMIN'? true : false
        })
        
    } catch (error) {
        console.error(`El error es ${error}`)
        res.status(500).redirect('/error-404')
    }
})

router.get('/create', async(req, res)=>{
    try {
        const admin_employer = await prisma.user.findMany({
            where:{
                role:  {
                    in: ['ADMIN', 'EMPLOYER']
                }
            }
        })
        const cliente = await prisma.user.findMany({
            where:{
                role: 'CLIENTE'
            }
        })
        res.render('crear-citas',{
            user: admin_employer,
            cliente: cliente
        })
        
    } catch (error) {
        console.error(`El error es ${error}`)
        res.status(500).redirect('/error-404')
    }
})

router.delete('', async(req, res)=>{
    try {
        await prisma.cita.delete({
            where:{
                id: req.body.id
            }
        })
    } catch (error) {
        console.error(`El error es ${error}`)
        res.status(500).redirect('/error-404')
    }
})



module.exports = router