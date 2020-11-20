const mongoose = require('mongoose')


const AppointmentSchema = mongoose.Schema({
    patientCode:{ // to be referenced
        type:String,
        unique:true,
        required: true
    },
    PatientName:{
        type:String,
        unique:true,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Room:{
        type:String,
        required:true
    },
    DoctorsID:{    // to be referenced
        type:String,
        required:true
    },
    DoctorsName:{
        type:String,
        required:true
    },
    Reasons:{
        type:String,
        required:true
    }
})

const AppointmentModel = mongoose.model('appointment',AppointmentSchema)

module.exports = AppointmentModel