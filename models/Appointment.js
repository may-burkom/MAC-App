
const mongoose = require('mongoose')

//------------Appointment Schema ---------------
const AppointmentSchema = new mongoose.Schema({

    date: {type: Date, default: new Date(), required: true},
    room: {type: String, required: true},
    reasons: {type: String, required: true},

    //Reference patient name from Patient model
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},

    //Reference doctor name doctor model
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' , required: true},

})


/* Virtual for referencing Consultation model */
AppointmentSchema.virtual('appointmentDate'), {
    ref: "Consultation",
    localField: "_id",
    foreignField: "appointmentDate"
}
// Set Object and Json property to true. Default is set to false
AppointmentSchema.set('toObject', {virtuals: true})
AppointmentSchema.set('toJSON', {virtuals: true})


//Appointment model
const Appointment = mongoose.model('Appointment', AppointmentSchema)

//Export appointment model
module.exports = Appointment