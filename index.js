

//utils
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-Parser')
const RegistrationNumber=require('./models/registrationNum');


//Lab
const authLab = require('./routers/lab-routers/auth-lab');
const labInfo=require('./routers/lab-routers/lab-info');
const labMedTest=require('./routers/lab-routers/lab-medicalTest');
const labHome=require('./routers/lab-routers/lab-home');
const labpH=require('./routers/lab-routers/lab-patinetsHistory');
const labRate=require('./routers/lab-routers/lab-rate');


//Pharmacy
const authPharm = require('./routers/pharmacy-routers/auth-pharmacy');
const pharmacyInfo=require('./routers/pharmacy-routers/pharmacy-info');
const pharmacyHome=require('./routers/pharmacy-routers/pharmacy-home');
const pharmacypH=require('./routers/pharmacy-routers/pharmacy-patinetsHistory');
const pharmacyDrugs=require('./routers/pharmacy-routers/pharmacy-drugs');
const pharmacyRate=require('./routers/pharmacy-routers/pharmacy-rate');


//Doctor
const authDoc = require('./routers/doctor-routers/auth-doctor');
const doctorInfo=require('./routers/doctor-routers/doctor-info');
const doctorPrescription = require('./routers/doctor-routers/doctor-prescription');
const doctorpH=require('./routers/doctor-routers/doctor-patinetsHistory');
const doctorHome=require('./routers/doctor-routers/doctor-home');
const doctorRate=require('./routers/doctor-routers/doctor-rate')


//Patinet
const authPatinet = require('./routers/patinet-routers/auth-patinet');
const patinetHome=require('./routers/patinet-routers/patinet-home');
const patinetInfo=require('./routers/patinet-routers/patinet-info');
const patinetHistory=require('./routers/patinet-routers/patinetHistory');
const search=require('./routers/patinet-routers/search');


//Admin 
const authAdmin = require('./routers/admin-routers/auth-admin');
const getDoctors = require('./routers/admin-routers/getDoctors');
const getLabs = require('./routers/admin-routers/getLabs');
const getPharmacies = require('./routers/admin-routers/getPharmacies');
const insertReg = require('./routers/admin-routers/insertReg');
const contactUs = require('./routers/admin-routers/contactUs');
const addmsg=require('./routers/admin-routers/addmsg');

//app
const app = express();
const cors=require('cors');
const authMiddleware = require('./utils/auth');
mongoose.connect('mongodb://localhost/mydoctor')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));


   

// async function create(){
//     const patientId = new Admin({
//         email:'Admin@gmail.com',
//         password:'ThisPassword0000'
//         });
//     const result = await patientId.save();
//     console.log(result);
// }
// create();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());



//Doctor
app.use('/forms/form-basic',authMiddleware,doctorInfo);
app.use('/api/prescription',authMiddleware,doctorPrescription);
app.use('/basic/breadcrumb-paging',authMiddleware,doctorpH);
app.use('/authDoctor',authDoc);
app.use('/dashboard/default',authMiddleware,doctorHome);
app.use('/Drate',authMiddleware,doctorRate)

//Lab
app.use('/authLab',authLab);
app.use('/labInfo',authMiddleware,labInfo);
app.use('/labMedTest',authMiddleware,labMedTest);
app.use('/labHome',authMiddleware,labHome);
app.use('/labpH',authMiddleware,labpH);
app.use('/lrate',authMiddleware,labRate);


//Pharmacy
app.use('/authPharm',authPharm);
app.use('/pharmacyHome',authMiddleware,pharmacyHome);
app.use('/pharmacyInfo',authMiddleware,pharmacyInfo);
app.use('/pharmacyDrugs',authMiddleware,pharmacyDrugs);
app.use('/pharmacypH',authMiddleware,pharmacypH);
app.use('/PhRate',authMiddleware,pharmacyRate);

//Admin 
app.use('/authAdmin',authAdmin);
app.use('/getDoctors',authMiddleware,getDoctors);
app.use('/getLabs',authMiddleware,getLabs);
app.use('/getPharmacies',authMiddleware,getPharmacies);
app.use('/insertReg',authMiddleware,insertReg);
app.use('/contactUs',authMiddleware,contactUs);
app.use('/addmsg',addmsg);

//Patinet
app.use('/auth',authPatinet);
app.use('/patinetHome',authMiddleware,patinetHome);
app.use('/patinetInfo',authMiddleware,patinetInfo);
app.use('/patinetHistory',authMiddleware,patinetHistory);
app.use('/Search',search);

app.listen(8000, () => console.log('Listening on port 8000...'));