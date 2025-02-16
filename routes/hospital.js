const express = require("express") ;
const router = express.Router({mergeParams: true}) ;

const {isUserLOgedIn} = require("../middlewear")

const Hospital = require("../modles/hospital.js")

router.get("/Register-new-hospital",isUserLOgedIn , async(req ,res)=>{
    res.render("./hospital/registerNew.ejs")
})

// accept request for new hospital registration ;

router.post("/Register-new-hospital" ,isUserLOgedIn , async(req,res,next) =>{
    const {name , email ,ownerName,address,slogan,phone_no,state,city} = req.body ; 
    const hospital = new Hospital({
        name : name ,
        email : email ,
        ownerName : ownerName ,
        address : address,
        slogan : slogan ,
        phone_no : phone_no,
        state : state ,
        city : city,
        owner : req.user._id 
    })

     result = await hospital.save() ;
    res.send(result)
})

router.get("/myhospital" , async(req,res)=>{
    cconsole.log("Hello World")
})


module.exports = router ;