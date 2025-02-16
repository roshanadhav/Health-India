const express = require("express")
const router = express.Router({mergeParams:true})
const Appointment = require("../modles/appointment.js")
const Doctor = require("../modles/doctors.js")
const ExpressError = require("../utils/ExpressError.js")
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport")
const User = require("../modles/users.js")
const redirectUrl = require("../middlewear.js").redirectUrl
const {isUserLOgedIn}  = require("../middlewear.js")

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })




// Join A doctor :

router.get("/join",async (req,res,next)=>{
    res.render("./doctors/joinNewDoctorForm.ejs")
})

//join new doctor 

router.post("/",async(req,res,next)=>{
    let {name,address,email,image,imgName,age,location,registration_number} = req.body ;
    let newdoctor = new Doctor({
        name,
        address,
        email,
        image,
        age,
        location,
        registration_number
    })
    const savedDoctor = await newdoctor.save()
    let reqUser = await User.findByIdAndUpdate(`${req.user._id}`, {ifdoctor :savedDoctor._id},{ new: true } )
    if(reqUser){
        res.redirect("/doctors/profile")
    }else{
        res.redirect("/doctors/join")
        flash("error","Something went wrong")
    }

})
// showing doctors profile 
router.get("/profile",async(req,res)=>{
    let doctor = req.user ;
    if(doctor){
        const getDoctor = await User.findById(doctor._id).populate({
            path: 'ifdoctor',  // First level populate
            populate: [
            { path: 'offlineAppointments' },  // Nested populate for `offlineAppointments`
            { path: 'reviews' , populate : "postedBy"}  // Nested populate for `reviews`
    ]})
        if(getDoctor && getDoctor.ifdoctor.name) {
            res.render("./doctors/profile.ejs",{getDoctor})
        }
        else{
            res.redirect("/doctors/join")
        }
    }
    else {
        res.redirect("/users/profile")
    }
})


// appointments approval 

router.get("/approve/:id/appointment/:appid", async (req,res)=>{
    let {id , appid} = req.params ;
    await Appointment.findByIdAndUpdate(appid , {status  : "Confirmed"},{new : true})
    res.redirect("/doctors/profile")
})

//reject appointment 

router.get("/del/:id/appointment/:appid", async (req,res)=>{
    let {id , appid} = req.params ;
    await Appointment.findByIdAndUpdate(appid , {status  : "Rejected"} , {new : true})
    res.redirect("/doctors/profile")
})


//Change status
router.get("/change/:id/appointment/:appid", async (req,res)=>{
    let {id , appid} = req.params ;
    await Appointment.findByIdAndUpdate(appid , {status  : "pending"} , {new : true})
    res.redirect("/doctors/profile")
})

//remove appointment : 
router.get("/remove/:id/appointment/:appid", async (req,res)=>{
    let {id , appid} = req.params ;
    await Appointment.findByIdAndUpdate(appid , {status  : "Rejected"} , {new : true})
    await Doctor.findByIdAndUpdate(id ,{$pull : {offlineAppointments : appid}})
    res.redirect("/doctors/profile")
})

//profile photo :

router.post("/profile-photo/:id" ,upload.single('image'), async (req,res)=>{
    let { id } = req.params ;
    let { image } = req.file ;
    console.log(req.body)
    res.send(req.file)
})



router.get("/follow/:id" ,isUserLOgedIn, async(req,res)=>{
    let {id} = req.params ;
    let doctor = await Doctor.findById(id )
    if (!doctor.followers.includes(req.user._id)) {
        doctor.followers.push(req.user._id)
        doctor.save()
        const user = await User.findById(req.user._id).populate("ifdoctor")
        user.following.push(id)
        if (user.ifdoctor) {
            let userid =  user.ifdoctor._id
            let finddoctor = await Doctor.findById(userid )
            finddoctor.following.push(id)
            finddoctor.save()
        }
        user.save()
    }
    res.redirect(`/users/home-doctor/${id}`)
})

router.get("/unfollow/:id" ,isUserLOgedIn, async(req,res)=>{
    let {id} = req.params ;
    await Doctor.findByIdAndUpdate(id, {$pull : {followers : req.user._id}})
    await User.findByIdAndUpdate(req.user._id, {$pull : {following : id}})

    const user = await User.findById(req.user._id).populate("ifdoctor")
    if (req.user.ifdoctor) {
       let userid =  user.ifdoctor._id
       await Doctor.findByIdAndUpdate(userid, {$pull : {following : id}})

    }
})


// show followrs and folllowing  routes : 

router.get("/show-followers/:id" , async (req,res)=>{
    const {id} = req.params ;
    let doctor = await Doctor.findById(id)
    let arr = []
    for(follower of doctor.followers ){
        let user = await User.findById(follower).populate("ifdoctor")
        if(user){
            let obj = {
                name :  user.username ,
                profile :  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            }
            if(user.ifdoctor && user.ifdoctor.image ){
                obj.profile = user.ifdoctor.image
            }
            arr.push(obj)
           
        }
       
    }
    res.json(arr)
})


router.get("/show-following/:id" , async (req,res)=>{
    const {id} = req.params ;
    let doctor = await Doctor.findById(id)
    let arr = []
    for(following of doctor.following ){
        let user = await Doctor.findById(following)
        let obj = {
            name : user.name ,
            profile : user.image ,
            email : user.email,
            id : user._id
        }
        arr.push(obj)
    }
    res.json(arr)
})



module.exports = router ;