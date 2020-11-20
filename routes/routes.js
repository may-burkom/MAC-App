const express = require('express')
const router = express.Router()

const jwt = require("jsonwebtoken") // package to be installed
const bodyParser = require("body-parser")// packages to be installed
const cookieParser = require("cookie-parser") //package to be installed

const Appointment = require('./models/Appointment.js')
const Patient = require('../models/Patient.js')
const Doctor = require('../models/Doctor.js')
const Admin = require('../models/Admin.js')
const Consultation = require('../models/Consultation.js')

//////////////////// ROUTES //////////////////////////////

/* ================ FOR THE FIVE PAGES ================= */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());


router.get('/', function(req, res){
    //root route is for the main home
    res.redirect("/main-home")
})
router.get('/main-home', function(req, res){
    //root route is for the main home
    res.sendFile(__dirname + "./")
})
//--------------------------------------------------------------------------------------Users Login Route-----------------
router.post("/logout", function(req,res)=>{
    res.clearCookie('token') // clear token
    res.redirect("/main-home") // go back to main-home page
})
router.post("/login-doctor", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const doctor = await Doctor.findOne({ username }).exec()
        console.log(doctor)
        if (!doctor) {
            res.redirect("/")              //Check username
        }
        doctor.comparePassword(password, (error, match) => {
            if (!match) {
                res.redirect("/")
            }
        })
        // if valid credentials assigning user a token and send it to the user
        jwt.sign({ user: doctor }, "secretkey", (err, token) => {
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true }) // send the token as cookies to client
            res.redirect("/doctor-home") //reriect to the admin-home page
        })
        res.redirect("/doctor-home") //send homepage if valid username and password
    } catch (error) {
        console.log(error)
    }
})
//............................................................................
router.post("/login-patient", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const patient = await Patient.findOne({ username }).exec()
        if (!patient) {
            console.log("no patient")
            res.redirect("/")              //Check usernam
        }
        patient.comparePassword(password, (error, match) => {
            if (!match) {               //check password
                console.log("password not matched")
                res.redirect("/")
            }
        })
        // if valid credentials assigning user a token and send it to the user
        jwt.sign({ user: admin }, "secretkey", (err, token) => { // sign the token 
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true }) // send the token as cookies to client
            res.redirect("/patient-home") //reriect to the admin-home page
        })
        res.redirect("/patient-home") //send homepage if valid username and password
    } catch (error) {
        console.log(error)
    }
})
//.............................................................................

router.post("/login-admin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const admin = await Admin.findOne({ username }).exec()
        if (!admin) {
            res.redirect("/")              //Check usernam
        }
        admin.comparePassword(password, (error, match) => {
            if (!match) {               //check password
                res.redirect("/")
            }
        })
        // if valid credentials assigning user a token and send it to the user
        jwt.sign({ user: admin }, "secretkey", (err, token) => { // sign the token 
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true }) // send the token as cookies to client
            res.redirect("/admin-home") //reriect to the admin-home page
        })
    } catch (error) {
        console.log(error)
    }
})
//---------------------------------------------------------------------------Home-Pages----------------------------------
router.get('/admin-home',verifyToken, function(req,res){
	jwt.verify(req.token, "secretkey", {expiresIn:"30s"},(err,authData)=>{
		if (err) {
			res.sendStatus(403)
		}else {
			res.sendFile(__dirname + "/views/homepage.html")
	}	
})
    
})
//............................................................................
router.get('/doctor-home',verifyToken, function(req,res){
    jwt.verify(req.token, "secretkey", { expiresIn: "30s" }, (err, authData) => {
		if (err) {
			res.sendStatus(403)
		} else {
			res.sendFile(__dirname + "/views/homepage.html") // sending users patient Home page
		}
	})
})
//............................................................................
router.get('/patient-home',verifyToken, function(req,res){
    jwt.verify(req.token, "secretkey", { expiresIn: "30s" }, (err, authData) => {
		if (err) {
			res.sendStatus(403)
		} else {
			res.sendFile(__dirname + "/views/homepage.html") // sending users patient Home page
		}
	})
})
//format of token
function verifyToken(req,res, next){
    //get auth header value
    const cookies = req.cookies['token']
    //check if token is a string
    if (typeof(cookies) == "string") {
        const Token = cookies
        req.token = Token
        //Next middleware
        next()

    }else{
        //forbidden
        res.sendStatus(403)
    }
}
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