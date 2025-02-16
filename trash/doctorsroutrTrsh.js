//doctor login form route ->

// router.get("/login",(req,res)=>{
//     res.render("./doctors/login.ejs")
// })

// //sinup or login get request form route ->

// router.post("/after-sinup",wrapAsync(async(req,res,next)=>{
//     const {registration_number,username,email,password} = req.body ;
//     const newDoctor = new Doctor({
//         registration_number:registration_number,
//         email:email,
//         username : username
//     })
//     let result = await Doctor.register(newDoctor , `${password}`)
//     req.session.doctor = result.username ;
//     req.login(result,(err)=>{
//         if (err) {
//             req.flash("error",err.message)
//             res.redirect("/doctors/login")
//         } })
//         req.session.doctorUsername = result.username ;
//         req.flash("sucess", `${result.username} Welcome  To Health India`)
//         res.redirect("/doctors/doctor-post-login")
       
    
// }))

// router.get("/doctor-post-login",async(req,res,next)=>{
//     req.flash("sucess","welcome Doctor to HealthIndia")
//     const username = req.session.doctorUsername
//     console.log(req.session.doctorUsername )
//     req.flash("sucess","Welcome Back Doctor !")
//     const getDoctor =  await Doctor.findOne({username:username}).populate("offlineAppointments")
//     res.render("./doctors/doctor-post-login.ejs",{getDoctor})
//     req.session.user = getDoctor
// })
// router.get("/new-login",wrapAsync( async (req,res,next)=>{
//     res.render("./doctors/new-login.ejs")
// }))

// //sinin Form ->
// router.post("/post-sinin",passport.authenticate('doctor-local', { failureRedirect: '/doctors/login', failureFlash:true }) , wrapAsync(async (req,res,next)=>{
//     const {username}=req.body ;
//     req.session.doctorUsername = username ;
//     req.flash("sucess","Welcome Back Doctor !")
//     res.redirect("/doctors/doctor-post-login")
     
// }))
// router.post("/post-sinin-new",passport.authenticate('doctor-local', { failureRedirect: '/doctors/new-login', failureFlash:true }) , wrapAsync(async (req,res,next)=>{
//     const {username}=req.body ;
//     req.flash('username',`${username}`)
//     req.flash("sucess","Welcome Back Doctor !")
//     res.redirect("/doctors/doctor-post-login")
// }))

// Revivew :

// router.post(":id/revivew",async(req,res)=>{
//     const {id} = req.params ;
//     let newRevivewForDoctor = await Doctor.findById(`${id}`)
// })