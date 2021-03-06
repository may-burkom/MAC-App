const express = require('express')
const app = express()
const router = express.Router()

const jwt = require("jsonwebtoken") // package to be installed
const bodyParser = require("body-parser")// packages to be installed
const cookieParser = require("cookie-parser") //package to be installed

const Appointment = require('../models/Appointment.js')
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
router.post("/logout", function(req,res){
    res.clearCookie('token') // clear token
    res.redirect("/main-home") // go back to main-home page
})
router.post("/login-doctor", async (req, res) => {
    const username = req.body.docUsername
    console.log(username)
    const password = req.body.docPassword
    try {
        const doctor = await Doctor.findOne({ username: username }).exec()
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
        console.log('usrnm & pswrd was a match!')
        jwt.sign({ user: doctor }, "secretkey", (err, token) => {
            console.log(`Token: ${token}`)
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true }) // send the token as cookies to client
            console.log('foofa')
            res.redirect("/doctor-home") //reriect to the doctor-home page
        })
        res.redirect("/doctor-home") //send homepage if valid username and password
    } catch (error) {
        console.log(error)
    }
})
//............................................................................
router.post("/login-patient", async (req, res) => {
    const username = req.body.patUsername
    const password = req.body.patPassword
    try {
        const patient = await Patient.findOne({ username }).exec()
        if (!patient) {
            console.log("no patient")
            res.redirect("/")              //Check username
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
    const username = req.body.admUsername
    const password = req.body.admPassword

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
    console.log("par-tay")
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
function verifyToken(req, res, next){
    //get auth header value
    // console.log(Object.keys(req))
    console.log(req.headers)
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

//get pateints data and send to frontend
router.get('/patient-details/:id', function(req, res){
    console.log(req.params.id)
    Patient.findById({_id: req.params.id})
        .then(function(patientUser){
            console.log(patientUser)
            res.send(patientUser)
        })
        .catch((err)=>{console.log(err)})
})

router.post('/add-appointment', function(req, res){
    console.log(req.body)
    let newAppointment = new Appointment({
        date: req.body.appointDate,
        room: req.body.appointRoom,
        reasons: req.body.appointReasons
    })
    newAppointment.save()
        .then(function(savedAppointment){
            console.log(savedAppointment)
        })
        .catch((err)=> console.log(err))
})

//for the doctors
router.get('/get-appointments', function(req, res){
    // request doctor's mongo obj ID
    // Doctor.find({})
    //     .then(function(docObj){
            
    //     })
})

//get doctor data and send to frontend
router.get('/doc-details/:id', function(req, res){
    console.log(req.params.id)
    Doctor.findById({_id: req.params.id})
        .then(function(docUser){
            console.log(docUser)
            res.send(docUser)
        })
        .catch((err)=>{console.log(err)})
})

router.post('/add-consultation', function(req, res){
    console.log(req.body)
    let newConsultation = new Consultation({
        consultationSummary: req.body.consultSummary,
        attachedFile: req.body.consultAttachedFile
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
        patientCode: req.body.patCode,
        firstName: req.body.patName,
        lastName: req.body.patSurname,
        username: req.body.patUserName,
        password: req.body.patPassword,
        gender: req.body.patGender,
        dob: req.body.patDoB,
        height: req.body.patHeight,
        weight: req.body.patWeight,
        mobilePhone: req.body.patMobilePhone,
        email: req.body.patEmail,
        section: req.body.patSection,
        lotNo: req.body.patLotNo,
        street: req.body.patStreet,
        city: req.body.patCity
    })
    newPatient.save()
        .then(function(savedPatient){
            console.log(savedPatient)
            res.send(savedPatient)
        })
        .catch((err)=> console.log(err))
})

router.post('/add-doctor', function(req, res){
    console.log(req.body)
    let newDoctor = new Doctor({
        firstName: req.body.docName,
        lastName: req.body.docSurname,
        username: req.body.docUsername,
        password: req.body.docPassword,
        gender: req.body.docGender,
        dob: req.body.docDoB,
        email: req.body.docEmail,
        specializedField: req.body.docSpeciality
    })
    newDoctor.save()
        .then(function(savedDoctor){
            console.log(savedDoctor)
            res.send(savedDoctor)
        })
        .catch((err)=> console.log(err))
})

router.post('/add-admin', function(req, res){
    console.log(req.body)
    let newAdmin = new Admin({
        firstName: req.body.admName,
        lastName: req.body.admSurname,
        username: req.body.admUsername,
        password: req.body.admPassword,
        gender: req.body.admGender,
        dob: req.body.admDoB,
        position: req.body.admPosition,
        height: req.body.admHeight,
        weight: req.body.admWeight,
        telephone: req.body.admTelephone,
        email: req.body.admEmail,
        section: req.body.admSection,
        lotNo: req.body.admLotNo,
        street: req.body.admStreet,
        city: req.body.admCity
    })
    newAdmin.save()
        .then(function(savedAdmin){
            console.log(savedAdmin)
            res.send(savedAdmin)
        })
        .catch((err)=> console.log(err))
})

/* ============================================================= */
///////////////////////////////////////////////////////////////////

module.exports = router