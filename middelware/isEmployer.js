function isEmployer (req, res, next){
    if(req.user.role === "EMPLOYER"){
        return next()
    }
return res.redirect('/error-404')
}

module.exports = isEmployer