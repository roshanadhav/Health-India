const mongoose = require ("mongoose");

async function main() {
    mongoose.connect('mongodb+srv://roshanadhav02_db_user:J3WRFpJL5pclOf80@cluster0.pksusny.mongodb.net/?appName=Cluster0')
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
