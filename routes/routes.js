const express = require('express')
const router = express.Router()

const Appointment = require('./models/Appointment.js')
const Patient = require('./models/Patient.js')
const Doctor = require('./models/Doctor.js')
const Admin = require('./models/Admin.js')
const Consultation = require('./models/Consultation.js')

//this is Amy's test line
//this is the second test

//////////////////// ROUTES //////////////////////////////

/* ================ FOR THE FIVE PAGES ================= */
router.get('/', function(req, res){
    //root route is for the login page
    res.redirect("login")
})

router.post('/find-user', function(req, res){
    // route is for when login for is submitted to search for user and redirect to appropriate page
    // either patient home, doctor home or admin home
})

router.get('/admin-signup', function(req,res){

})

router.get('/admin-home', function(req,res){
    
})

router.get('/doctor-home', function(req,res){
    
})

router.get('/patient-home', function(req,res){
    
})

/* ======================================================= */

/* ===================== REST API  ========================*/

//for the patients
router.get('get-consultations', function(req, res){

})

router.post('/add-appointment', function(req, res){

})

//for the doctors
router.get('get-appointments', function(req, res){

})

router.post('/add-consultation', function(req, res){

})

//for admin
router.post('/add-patient', function(req, res){

})

router.post('/add-doctor', function(req, res){
    
})

router.post('/add-admin', function(req, res){
    
})

/* ============================================================= */
///////////////////////////////////////////////////////////////////

module.exports = router