if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}




//----> set up


const express = require("express")
const app = express();
const ejs = require("ejs")
const ejsMate = require("ejs-mate")
const methodOveride = require("method-override")
const mongoose = require("mongoose")
const port = 8080
const path = require("path")
const Appointment = require("./modles/appointment.js")
const Virtual = require("./modles/virtual.js")
const Doctor = require("./modles/doctors.js")
const ExpressError = require("./utils/ExpressError.js")
const doctors = require("./routes/doctors.js")
const users = require("./routes/users.js")
const {isUserLOgedIn} = require("./middlewear.js")
const User = require("./modles/users.js")
const hospital = require("./routes/hospital.js")
// const localStrategy = require("passport-local")

// const {wrapAsync} = require("./utils/wrapAsync.js")
app.use(methodOveride('_method'))
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
const passport = require("passport")
const LocalStrategy = require("passport-local")
app.use(cookieParser())
const QRCode = require("qrcode")
// mullter 

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const medical = require("./routes/medicals.js")
const delevery = require("./routes/delevary.js")
//connecting to data base
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/healthindia')
}
main()
.then(res=>console.log("connected to db"))
.catch(err=>console.log(err))


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// setting engine ->
app.engine("ejs",ejsMate)

// Root Route

app.get("/",(req,res)=>{
    res.send("working")
})
app.use(flash())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge : 7 * 24 * 60 * 60 * 1000 ,
        httpOnly :true 
    }
  }))




app.use(passport.initialize())
app.use(passport.session())

passport.use('user-local', new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.sucess = req.flash("sucess")
    res.locals.error = req.flash("error")
    res.locals.user = req.user ;
    next();
})
// for QR codes 
app.get('/generate-qr/:doctorId', async (req, res) => {
    const doctorId = req.params.doctorId;
    const url = `http://${process.env.HOST}/users/home-doctor/${doctorId}`;

    try {
        const qrCodePath = path.join(__dirname, 'public', `./QRcodes/${doctorId}_qr.png`);
        await QRCode.toFile(qrCodePath, url);
        await Doctor.findByIdAndUpdate(doctorId , {qrCode : true})
        res.redirect(`/doctors/profile`);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});

app.get("/users/home-doctor/undefined",(req,res,)=>{
    let status = "500",message = "This Account Does Not Exists Or May Be Users Account" ;
    res.render("Error.ejs",{status,message})
})
//doctors
app.use("/doctors", doctors) 
//users
app.use("/users", users)

// hospitals
app.use("/hospital",hospital)

//medical 
app.use("/medical",medical)

//dilevary 

app.use("/delevary" , delevery)


app.get("/provide-your-service" ,isUserLOgedIn, async (req,res , next)=>{
    res.render("./provideservice.ejs")
})

//error handler

app.use((err,req,res,next)=>{
    let {status = "500",message = "page not found"} = err ;
    res.render("Error.ejs",{status,message})
})


// listing route

app.listen(port , ()=>{
    console.log(`lisening on port ${port}`)
})


//console