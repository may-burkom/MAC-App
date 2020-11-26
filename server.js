


//--------------------------POSTMAN TESTING -----------------------------------------------------
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Appointment = require('./models/Appointment')
const Consultation = require('./models/Consultation')
const Doctor = require('./models/Doctor')
const Patient =  require('./models/Patient')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Connecting mongodb from node js
mongoose.connect('mongodb+srv://amondo:amondo@ngalabiiscluster.lurxh.mongodb.net/testModel?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true },
 function(err, database) {
	 if (err) {
		 throw err;
		}
		console.log("Connected to Test MongoDB...")
    })


// - ------ PATIENT ROUTES --------------------

app.get('/patient/new', (req, res) => {

    res.sendFile(__dirname, '', 'index.html')
})

app.post('/patient/save', async (req, res) => {

    const patient = new Patient(req.body)
    const savePatient = await patient.save()
    console.log(savePatient)
    res.json(savePatient)
})

app.post('/doctor/save', async (req, res) => {
    const doctor = new Doctor(req.body)
    const saveDoctor = await doctor.save()
    console.log(saveDoctor)
    res.json(saveDoctor)
})

app.get('/patient/consultation-summaries', async (req, res) => {

    const consultationSummary  = await Patient.find()
                                              .populate({path: 'patientConsultation', select: 'consultationSummary attachedFile appointmentDate doctor' })

    console.log(consultationSummary)
    res.status(200).json({consultationSummary});
})

// Render all the appointments made by the patient
app.get('/patient/appointments', async (req, res) => {

    const appointmentsMade  = await Patient.find()
                                              .populate({path: 'appointmentsMade', select: 'date room reasons doctor' })
    res.status(200).json({appointmentsMade});

})

// Render Appointment form with doctors listed 
app.get('/patient/appointment/', async (req, res) => {
    const doctors = await Doctor.find({})
    console.log(doctors)
    res.json(doctors)

})

// save appointment made by the patient
app.post('/appointment/new', async (req, res) => {

    const appointment = new Appointment(req.body)
    const saveAppointment = await appointment.save()
    console.log(saveAppointment)
    res.json(saveAppointment)

})

// --------------- DOCTOR'S ROUTES --------------------

//View all the consulations summaries written for the patients
app.get('/doctor/consultations/', async (req, res) => {
    const consultationWritten = await Doctor.find()
                                            .populate({path: 'writtenConsultation', select: 'consulationSummary attachedFile appointmentDate patient'})
    console.log(consultationWritten)
    res.json(consultationWritten)
})

// View all appointments for the doctor
app.get('/doctor/appointments', async (req, res) => {
    const appointments = await Doctor.find()
                                     .populate({path: 'doctorAppointments', select: 'date room reasons patient'})
    console.log(appointments)
    res.json(appointments)
    })

// Render consulation form for the doctor to write to specific patient
app.get('/consultation/:id', async (req, res) => {
    const patientId = req.params.id
    res.json(patientId)
})

// Save consulatation summary for the patient
app.post('/consultation/new', async (req, res) => {

    const consultation = new Consultation(req.body, {
        doctor: req.session.id
    })

    const saveConsultation = await consultation.save()
    console.log(saveConsultation)
    res.json(saveConsultation)
})

app.listen(1000, () => {
    console.log('started')
})

