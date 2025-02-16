const mongoose = require("mongoose") ;

const appoinmentSchema = mongoose.Schema({
    virtual:{
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
        }
    }
})

const Virtual = mongoose.model("Virtual",appoinmentSchema)

module.exports = Virtual ; 

