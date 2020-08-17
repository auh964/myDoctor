const express = require('express');
const {Doctor} = require('../../models/doctor');
const {Lab} = require('../../models/lab');
const {Pharmacy} = require('../../models/pharmacy');
const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);
const {verify} = require('../../utils/jwt');

const router = express.Router();

router.get('/getDoctors/:specialty', async (req, res) => {

    const doctor = await Doctor.find({ specialty: req.params.specialty });
    res.send(doctor);
    
});

router.get('/getLab' , async (req , res) =>{

    const lab = await Lab.find();
    res.send(lab);

});
router.get('/getPharmacy' , async (req , res) =>{
    const pharmacy = await Pharmacy.find();
    res.send(pharmacy);
});
module.exports=router;