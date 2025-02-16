const express = require("express")
const router = express.Router({mergeParams:true})
const Appointment = require("../modles/appointment.js")
const Doctor = require("../modles/doctors.js")
const ExpressError = require("../utils/ExpressError.js")
const wrapAsync = require("../utils/wrapAsync.js")
const User = require("../modles/users.js")
const passport = require("passport")
const localStrategy = require("passport-local")
const {isUserLOgedIn}  = require("../middlewear.js")
const {Revivew} = require("../modles/revivew.js")
const redirectUrl = require("../middlewear.js").redirectUrl


//users
//user login and sinup routes 

router.get("/login",(req,res)=>{
    res.render("./users/usersinup.ejs")
})


router.post("/after-sinup",redirectUrl,async(req,res,next)=>{
    const {username,email,password} = req.body ;
    const newUser = new User({
        email:email,
        username : username
    })
    const registredUser = await User.register(newUser , `${password}`)
    req.login(registredUser,(err)=>{
        if (err) {
            req.flash("error",err.message)
            res.redirect("/users/login")
        } else {
            req.session.user = registredUser ;
            req.flash("sucess", `${req.session.user.username} Welcome  To Health India`)
            let redirecturl = res.locals.redirectUrl || "/users/home"
            res.redirect(redirecturl)
        }
    })
    
    
})


//Login route 

router.get("/new-login",wrapAsync( async (req,res,next)=>{
    res.render("./users/new-locin.ejs")
}))

//sinin Form ->
router.post("/post-sinin",redirectUrl,passport.authenticate('user-local', { failureRedirect: '/users/login', failureFlash:true }) , wrapAsync(async (req,res,next)=>{
    req.session.user = req.user ;
    req.flash("sucess", ` Welcome Back  To Health India`)
    let redirecturl = res.locals.redirectUrl || "/users/home"
    res.redirect(redirecturl)
     
}))

router.post("/post-sinin-new",redirectUrl,passport.authenticate('user-local', { failureRedirect: '/users/new-login', failureFlash:true }) , wrapAsync(async (req,res,next)=>{
    req.session.user = req.user ;
    req.flash("sucess", ` Welcome Back  To Health India`)
    let redirecturl = res.locals.redirectUrl || "/users/home"
    res.redirect(redirecturl)
    const user =  await User.findOne({username:username})
     
}))

//Appointment From Home 

router.get("/appointment-from-home",async(req,res)=>{
    res.render("./doctors/appointment-home.ejs")
})


//booking appoinment offline ->

router.post("/new-appoinment-booking", wrapAsync(async (req,res,next)=>{
    let {name,doctorEmail,phone_no,reason,state,city,date, location } = req.body ;
    const bookDoctor = await Doctor.findOne({email : doctorEmail})
    if(!bookDoctor){
        req.flash("error","Doctor Not Found With Provided Email ! Please Check The Email ")
        res.redirect("/users/appointment-from-home")
    }
    if(bookDoctor){
        const newofflineAppointment  = new Appointment({
            name:name,
            doctorEmail:doctorEmail,
            phone_no:phone_no,
            reason:reason,
            state:state,
            city:city,
            location : location ,
            date:date , 
        })
        let doctor = await Doctor.findOne({email:doctorEmail} )
        let appointment = await newofflineAppointment.save()
        doctor.offlineAppointments.push(appointment)
        await doctor.save()

        if(req.user && req.user._id){
            let user = await User.findById(req.user._id )
            user.appointment.push(appointment)
            await user.save()

            res.redirect("/users/myappointments")
        }
        else{
            res.render("./users/ticket.ejs",{appointment})
        }
        
    }

}))
// Show appointments route : 

router.get("/myappointments",isUserLOgedIn,async (req,res)=>{
    if(req.user && req.user._id){
        reqUser = await User.findById(req.user._id).populate("appointment")
        res.render("./users/myAppointments.ejs",{reqUser})
    }
})


// Home Web Route -> 

router.get("/home", wrapAsync(async (req,res,next)=>{
    const doctors =  await Doctor.find({})
    res.render("./users/home.ejs",{doctors})
}))

//show doctor from route ->

router.get("/home-doctor/:id",  async(req,res)=>{
    let {id} = req.params ;
    const getDoctor = await Doctor.findById(`${id}`).populate([{path:"reviews",populate:{path : "postedBy"}}])
    const doctors =  await Doctor.find({})
    res.render("./users/vivew-doctor.ejs",{getDoctor,doctors})
})

//logout 

router.get("/logout",async(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err.msg)
            next(err)
        }
    })
    res.redirect("/users/home")
    
})


// post revivew ->
router.get("/:id/revivew",async(req,res,next)=>{
    let {id} = req.params ;
    res.redirect(`/users/home-doctor/${id}`)
})

router.post("/:id/revivew",isUserLOgedIn,async(req,res,next)=>{
    const {id} = req.params ;
    const posterUsername  = req.user.username ;
    const postUser = await User.findOne({username:posterUsername})
    const {rating , comment} = req.body ; 
    const  postRevivew = new Revivew({
        rating :rating ,
        comment : comment,
        postedBy : postUser
    })
    revivew = await postRevivew.save()
    const revivewForDoctor = await Doctor.findById(`${id}`)
    revivewForDoctor.reviews.push(revivew)
    await revivewForDoctor.save()
    .then(result=>{
        res.redirect(`/users/home-doctor/${id}`)
    }).catch(err=>console.log())
})

//Profile :

router.get("/profile",isUserLOgedIn,async(req,res,next)=>{
    // let username = req.user.username ;
    if(req.user && req.user._id){
        reqUser = await User.findById(req.user._id).populate("appointment")
        res.render("./users/userProfile.ejs",{reqUser})
    }

})


//revivews edit 
router.get("/:id/review/:revid",isUserLOgedIn,async(req,res,next)=>{
    let { id, revid} = req.params ;
    let result = await Revivew.findById(`${revid}`)
    res.render("./users/editRevivew.ejs",{id,revid,result})
})

// edit reciver 
router.patch("/:id/revivew/:revid",isUserLOgedIn,async(req,res,next)=>{
    let {id , revid} = req.params ;
    let {comment,rating} = req.body ;
    let userreq = await Revivew.findById(`${revid}`).populate("postedBy")

    if( req.user && req.user.username == userreq.postedBy.username){
        await Revivew.findByIdAndUpdate(`${revid}`,{comment:comment,rating:rating})
        res.redirect(`/users/home-doctor/${id}`)
    }
    else{
        res.redirect(`/users/home-doctor/${id}`)
        req.flash("error","You Are Not allow To edit revivew ")
    }
})


//delete route 

router.delete("/:id/review/:revid",isUserLOgedIn , async(req,res,next)=>{
    let {id,revid}= req.params ;
    let userreq = await Revivew.findById(`${revid}`).populate("postedBy")
    if( req.user && req.user.username == userreq.postedBy.username){
        await Revivew.findByIdAndDelete(`${revid}`)
        await Doctor.findByIdAndUpdate(`${id}`, {$pull : {reviews : `${revid}`}})
        res.redirect(`/users/home-doctor/${id}`)
        req.flash("sucess","Revivew Deleted Successfully ")
    }
    else{
        res.redirect(`/users/home-doctor/${id}`)
        req.flash("error","You Are Not allow To Delete revivew ")
    }
})

// how it works 

router.get("/howitworks" , (req,res)=>{
    res.render("./users/howitworks.ejs")
})


// cancel appointment for user :

router.get("/:id/cancel/:appid",async (req,res)=>{
    let { id, appid} = req.params ;
    let result = await Appointment.findById(appid)
    await User.findByIdAndUpdate(id ,  {$pull : {reviews : `${appid}`}} , {new:true})
    await Doctor.findOneAndUpdate({email : result.doctorEmail} ,  {$pull : {reviews : `${appid}`}} ,{new:true})
    await Appointment.findByIdAndDelete(appid)
    res.redirect("/users/myappointments")
})

router.get("/:id/edit/:appid",isUserLOgedIn,async (req,res)=>{
    let { id, appid} = req.params ;
    let appointment = await Appointment.findById(appid )
    res.render("./users/editAppointment.ejs", {appointment})
    
})
console.log
router.post("/confirmEdit/:appid",isUserLOgedIn,async (req,res)=>{
    
    let {name,doctorEmail,phone_no,reason,state,city,experience ,location} = req.body ;
    let {  appid} = req.params ;
    await Appointment.findByIdAndUpdate(appid , {
        name:name,
            doctorEmail:doctorEmail,
            phone_no:phone_no,
            reason:reason,
            state:state,
            city:city,
            experience:date,
            location:location,

    },{new : true})
    res.redirect("/users/myappointments")
    
})


// Explore Options : 

router.get("/explore", async (req,res)=>{
    res.render("./users/explore.ejs")
})


//edit appointment for user : 

module.exports = router ;


//console

