const prisma = require('../prisma/prisma')
const express = require('express');
const router = express.Router();
const passport = require('passport')
const bcrypt = require('bcrypt')
const isAuthenticated = require('../middelware/isAuthenticated')

router.get('/register', (req, res)=>{
    res.render('register')
})

router.post('/register', async (req, res)=>{
    const { username, password, role } = req.body
    try {
        if(!username && !password){
            res.status(500)
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data:{
                username: username,
                password: hashedPassword,
                role: role
            }
        });
        res.redirect('/auth/login')
    } catch (error) {
        console.error(`El error es ${error}`)
        res.status(500).redirect('/auth/register')
    }
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/citas',
    failureRedirect: '/auth/login',
    failureFlash: false,
  }));

module.exports = router