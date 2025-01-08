function isAdminOrEmployer (req, res, next){

    if(req.user.role === 'ADMIN' || req.user.role === 'EMPLOYER'){
        return next()
    }

    return res.redirect('/error-404')

}

module.exports = isAdminOrEmployer