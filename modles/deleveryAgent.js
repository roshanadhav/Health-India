const mongoose = require("mongoose")

const { Schema } = mongoose ;

const deleveryAgentSchema = mongoose.Schema({
    name : {
        type : String , 
        required : true 
    } , 
    adharNo : {
        type : String , 
        required : true 
    } ,
    loc : Location ,
    areaOfWorking : {
        type : Number ,
        required : true 
    } ,
    SigndArgriment : String ,
})

const DeleveryAgent = mongoose.model("DeleveryAgent" , deleveryAgentSchema)

module.exports = DeleveryAgent ;