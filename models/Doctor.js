
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Doctor Schema
const DoctorSchema = new mongoose.Schema({

	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	gender: {type: String, required: true},
	dob: {type: Date, required: true},
	email: {type: String, required: true},
	specializedField: {type: String, required: true}

})

/* Virtual for referencing Consultation model */
DoctorSchema.virtual('writtenConsultationSummaries', {
	ref: 'Consultation', 
	localField: '_id',
	foreignField: 'doctor'
})

// Set Object and Json property to true. Default is set to false
DoctorSchema.set('toObject', {virtuals: true})
DoctorSchema.set('toJSON', {virtuals: true})


/* Virtual for referencing Appointment model */
DoctorSchema.virtual('appointments', {
	ref: 'Appointment',
	localField: '_id',
	foreignField: 'doctor' 
})

// Set Object and Json property to true. Default is set to false
DoctorSchema.set('toObject', {virtuals: true})
DoctorSchema.set('toJSON', {virtuals: true})


/* Virtual for doctor's full name */
DoctorSchema.virtual('doctorFullname').get(function () {
	return 'Dr. '  + this.firstName + ' ' + this.lastName
})


DoctorSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }// encrypt and store password
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
//declaring method to compare password
DoctorSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password))
}

// Doctor model
const Doctor = mongoose.model('Doctor', DoctorSchema)

//Export doctor model
module.exports = Doctor
