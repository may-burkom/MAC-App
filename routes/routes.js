const express = require('express')
const router = express.Router()

const Appointment = require('./models/Appointment.js')
const Patient = require('./models/Patient.js')
const Doctor = require('./models/Doctor.js')
const Admin = require('./models/Admin.js')
const Consultation = require('./models/Consultation.js')

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
    console.log(req.body)
    let newAppointment = new Appointment({
        appointID: req.body.appointID,
        appointPatCode: req.body.appointPatCode,
        appointPatName: req.body.appointPatName,
        appointDate: req.body.appointDate,
        appointRoom: req.body.appointRoom,
        appointReasons: req.body.appointReasons
    })
    newAppointment.save()
        .then(function(savedAppointment){
            console.log(savedAppointment)
        })
        .catch((err)=> console.log(err))
})

//for the doctors
router.get('get-appointments', function(req, res){

})

router.post('/add-consultation', function(req, res){
    console.log(req.body)
    let newConsultation = new Consultation({
        consultAppointId: req.body.consultAppointId,
        consultPatCode: req.body.consultPatCode,
        consultPatName: req.body.consultPatName,
        consultDate: req.body.consultDate,
        consultRoom: req.body.consultRoom,
        consultDoctor: req.body.consultDoctor,
        consultSummary: req.body.consultSummary
    })
    newConsultation.save()
        .then(function(savedConsultation){
            console.log(savedConsultation)
        })
        .catch((err)=> console.log(err))
})

//for admin
router.post('/add-patient', function(req, res){
    console.log(req.body)
    let newPatient = new Patient({
        patCode: req.body.patCode,
        patName: req.body.patName,
        patSurname: req.body.patSurname,
        patUsername: req.body.patUsername,
        patPassword: req.body.patPassword,
        patDob: req.body.patDob,
        patGender: req.body.patGender,
        patHeight: req.body.patHeight,
        patTelephone: req.body.patTelephone,
        patMobilePhone: req.body.patMobilePhone,
        patEmail: req.body.patEmail,
        patSection: req.body.patSection,
        patLotNo: req.body.patLotNo,
        patStreet: req.body.patStreet,
        patCity: req.body.patCity
    })
    newPatient.save()
        .then(function(savedPatient){
            console.log(savedPatient)
        })
        .catch((err)=> console.log(err))
})

router.post('/add-doctor', function(req, res){
    console.log(req.body)
    let newDoctor = new Doctor({
        docName: req.body.docName,
        docSurname: req.body.docSurname,
        docUsername: req.body.docUsername,
        docPassword: req.body.docPassword,
        docDob: req.body.docDob,
        docGender: req.body.docGender,
        docHeight: req.body.docHeight,
        docTelephone: req.body.docTelephone,
        docMobilePhone: req.body.docMobilePhone,
        docEmail: req.body.docEmail,
        docSection: req.body.docSection,
        docLotNo: req.body.docLotNo,
        docStreet: req.body.docStreet,
        docCity: req.body.docCity,
        docCertificate: req.body.docCertificate,
        docLicenceType: req.body.docLicenceType,
        docSpeciality: req.body.docSpeciality
    })
    newDoctor.save()
        .then(function(savedDoctor){
            console.log(savedDoctor)
        })
        .catch((err)=> console.log(err))
})

router.post('/add-admin', function(req, res){
    console.log(req.body)
    let newAdmin = new Admin({
        admCode: req.body.admCode,
        admName: req.body.admName,
        admSurname: req.body.admSurname,
        admUsername: req.body.admUsername,
        admPassword: req.body.admPassword,
        admDob: req.body.admDob,
        admPosition: req.body.admPosition,
        admGender: req.body.admGender,
        admHeight: req.body.admHeight,
        admTelephone: req.body.admTelephone,
        admMobilePhone: req.body.admMobilePhone,
        admEmail: req.body.admEmail,
        admSection: req.body.admSection,
        admLotNo: req.body.admLotNo,
        admStreet: req.body.admStreet,
        admCity: req.body.admCity
    })
    newAdmin.save()
        .then(function(savedAdmin){
            console.log(savedAdmin)
        })
        .catch((err)=> console.log(err))
})

/* ============================================================= */
///////////////////////////////////////////////////////////////////

module.exports = router