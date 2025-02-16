const mongoose = require ("mongoose");

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/healthindia')
}

main()
.then(res=>console.log("connected to databse"))
.catch(err=>console.log(err))


const Doctor = require("../modles/doctors.js")
const doctorsSampledata = require("./doctorsData.js")






const initDB = async ()=>{
    await Doctor.deleteMany({})
    await Doctor.insertMany(doctorsSampledata.data)
}

initDB();
