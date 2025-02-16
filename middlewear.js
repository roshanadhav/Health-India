module.exports.isUserLOgedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You Must Be Logged In To Perform This Task")
        req.session.redirectUrl = req.originalUrl ;
        console.log(req.referer)
        res.redirect("/users/login")
    }
    else{
        next()
    }
}

module.exports.redirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl ;
    }
    next()
}



module.exports.isDoctorLOgedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You Must Be Logged In To Add A revivew")
        res.redirect("/doctors/login")
    }
    else{
    next()

    }

}