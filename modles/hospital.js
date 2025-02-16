const mongoose = require("mongoose") ;
const {Schema} = mongoose ;

const HospitalSchema = new Schema({
    name : {
        type : String ,
        required:true
    },
    image:{
        type : String ,
        default : ""
    },
    ourDoctors:[{
        type:Schema.Types.ObjectId ,
        ref : "Doctor"
    }],
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
    location : String ,
    reviews:[
        {
            type:Schema.Types.ObjectId ,
            ref : "Revivew"
        }
    ],
    ourdoctors:[
        {
            type:Schema.Types.ObjectId ,
            ref : "User"
        }
    ],
    owner :{
        type:Schema.Types.ObjectId ,
        ref : "User"
    },
    survices : [
        {}
    ],
    email : String ,
    ownerName : String ,
    address :  String ,
    slogan : String ,
    phone_no : Number ,
    state : String ,
    city : String ,



})

const Hospital = mongoose.model("Hospital",HospitalSchema)

module.exports = Hospital ;