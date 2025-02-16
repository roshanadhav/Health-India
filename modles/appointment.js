const mongoose = require("mongoose");


const appointschema = mongoose.Schema({
        name :{
            type:String,
            required:true
        },
        phone_no:{
            type:Number,
            required:true
        },
        reason:{
            type:String,
            required:true
        },
        state:{
            type : String,
            required:true,
        },
        city:{
            type:String,
            required:true
        },
        doctorEmail:{
            type:String ,
            required:true
        },
        date:Date,
        status : {
            type : String ,
            default : "pending"
        },
        experience : {
            type : String  ,
            default : "New Client"
        },
        location:{
            type : String ,
            default : "Not Avilable"
        }
    

})

const Appointment = mongoose.model("Appointment",appointschema)

module.exports = Appointment ;