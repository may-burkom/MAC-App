
const mongoose = require('mongoose')

// Consultation Schema
const consultationtSchema = new mongoose.Schema({

	consultationSummary: {type: String, required: true},
	attachedFile: {type: String},

	//Reference appointment date from Appointment model
	appointmentDate: {type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true},

	// Reference patient name  from patient model
	patientName: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},

	// Reference doctor name from doctor model
	doctorName: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},

})

// Consultation model
const Consultation = mongoose.model('Consultation', consultationtSchema)

//Export consultation model
module.exports = Consultation