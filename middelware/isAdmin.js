function isAdmin (req, res, next){
        if(req.user.role === "ADMIN"){
            return next()
        }
    return res.redirect('/error-404')
}

module.exports = isAdmin