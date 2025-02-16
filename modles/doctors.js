const mongoose = require("mongoose")
const passportLcoalMongoose = require("passport-local-mongoose")
const {Schema} = mongoose ;


const doctorSchema = mongoose.Schema({
    registration_number :{
        type : String,
        required : true
    },
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    
    image:{
            type:String,
            default:"https://i0.wp.com/www.kmcpvtltd.com/wp-content/uploads/2018/12/doctor.png?fit=300%2C300&ssl=1"
    },
    age:Number,
    address:String,
    location:String,
    
    reviews:[
        {
            type:Schema.Types.ObjectId ,
            ref : "Revivew"
        }
    ],
    offlineAppointments:[
        {
            type:Schema.Types.ObjectId ,
            ref : "Appointment"
        }
    ],
    virtualAppointments:[
        {
            type:Schema.Types.ObjectId ,
            ref : "Virtual"
        }
    ],
    followers :[
        {
            type:Schema.Types.ObjectId ,
            ref : "User"
        }
    ],
    following :[
        {
            type:Schema.Types.ObjectId ,
            ref : "User"
        }
    ],
    owner :{
        type:Schema.Types.ObjectId ,
        ref : "User"
    },
    qrCode : {
        type : Boolean ,
        default : false 
    }

})

const Doctor = mongoose.model("Doctor",doctorSchema)
module.exports = Doctor ;
