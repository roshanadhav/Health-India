const mongoose = require("mongoose")
const {Schema} = mongoose ; 
const passportLcoalMongoose = require("passport-local-mongoose")


const userSchema = new Schema({
    email:{
        type : String , 
        required: true 
    },
    ifdoctor :{
        type:Schema.Types.ObjectId ,
        ref : "Doctor"
    },
    ifmedicalOwner :{
        type:Schema.Types.ObjectId ,
        ref : "Medical"
    },
    appointment :[ {
        type:Schema.Types.ObjectId ,
        ref : "Appointment"
    }]

    ,

    following:[{
        type:Schema.Types.ObjectId ,
        ref : "Doctor"
    }]
})

userSchema.plugin(passportLcoalMongoose)
const User = mongoose.model("User",userSchema)
module.exports = User ;