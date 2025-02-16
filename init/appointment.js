const mongoose = require ("mongoose");

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/healthindia')
}

main()
.then(res=>console.log("connected to databse"))
.catch(err=>console.log(err))


const Appointment = require("../modles/appointment.js")
const sampleAppointment = require("./appointmentData.js")

const initDB = async ()=>{
    await Appointment.deleteMany({})
    await Appointment.insertMany(sampleAppointment.data)
}

initDB();
