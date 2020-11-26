const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')

// Patient schema
const PatientSchema = new mongoose.Schema({
	
	patientCode: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	gender: {type: String, required: true},
	dob: {type: Date, required: true},
	height: {type: Number, required: true, min: 30},
	weight: {type: 	Number, required: true, min: 20, max: 300},
	mobilePhone: {type: String, required: true, minlength: 8},
	email: {type: String, required: true},
	section: {type: String, required: true},
	lotNo:  {type: String, required: true},
	street:  {type: String, required: true},
	city:  {type: String, required: true},

})

/* Virtual for referencing consultation model */
PatientSchema.virtual('consultationSummaries', {
	ref: 'Consultation',
	localField: '_id',
	foreignField: 'patient' 
})

/* Set Object and Json property to true. Default is set to false */
PatientSchema.set('toObject', {virtuals: true})
PatientSchema.set('toJSON', {virtuals: true})


/* Virtual for referencing Appointmnent model */
PatientSchema.virtual('appointmentsMade', {
	ref: 'Appointment',
	localField: '_id',
	foreignField: 'patient'
})

/* Set Object and Json property to true. Default is set to false */
PatientSchema.set('toObject', {virtuals: true})
PatientSchema.set('toJSON', {virtuals: true})




/* Return Patient's Full name */
PatientSchema.virtual('patientFullname').get(function () {
	return this.firstName + ' ' + this.lastName
})


PatientSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }// encrypt and store password
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
//declaring method to compare password
PatientSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password))
}

// patient model
const Patient = mongoose.model('Patient', PatientSchema)

// Export Patient model

module.exports = Patient