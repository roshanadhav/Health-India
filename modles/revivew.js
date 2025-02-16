const mongoose = require("mongoose")
const passportLcoalMongoose = require("passport-local-mongoose")
const {Schema} = mongoose ;



const revivewSchema = new Schema({
    postedBy :
        {
            type:Schema.Types.ObjectId ,
            ref : "User"
        }
    ,
        comment :{
            type : String ,

        },
        rating :{
            type:Number
        }

})


module.exports.Revivew = mongoose.model("Revivew",revivewSchema)



