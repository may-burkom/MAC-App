const bcrypt = require('bcryptjs')


const mongoose = require('mongoose')

// Admin schema
const adminSchema = new mongoose.Schema({

	firstName: {type: String},//, required: true},
	lastname: {type: String},//, required: true},
	username: {type: String},//, required: true},
	password: {type: String},//, required: true},
	gender: {type: String},//, required: true},
	dob: {type: Date},//, required: true},
	position: {type: String},//, required: true},
	height: {type: Number},//, required: true, min: 30},
	weight: {type: 	Number},//, required: true, min: 20, max: 300},
	telephone: {type: Number},//, required: true},
	email: {type: String},//, required: true},
	section: {type: String},//, required: true},
	lotNo:  {type: String},//, required: true},
	street:  {type: String},//, required: true},
	city:  {type: String}//, required: true}
})

adminSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }// encrypt and store password
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
//declaring method to compare password
adminSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password))
}

// Admin models
const Admin = mongoose.model('Admin', adminSchema)

//Export admin model
module.exports = Admin