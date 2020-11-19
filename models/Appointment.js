
const mongoose = require('mongoose')

//------------Appointment Schema ---------------
const appointmentSchema = new mongoose.Schema({

    date: {type: Date, default: new Date(), required: true},
    room: {type: String, required: true},
    reasons: {type: String, required: true},

    //Reference patient name from Patient model
    patientName: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},

    //Reference doctor name doctor model
    doctorName: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' , required: true},

})

//Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema)

//Export appointment model
module.exports = Appointment