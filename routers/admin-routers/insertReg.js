const express = require('express');
const {RegistrationNumber} = require('../../models/registrationNum');
const {Admin} = require('../../models/admin');
const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.put('/RegistrationNumberDoctor' , async (req , res) =>{

    console.log(req.body);
    const regDoctor = await RegistrationNumber.findByIdAndUpdate('5df9ef0976c4ae0a00390924',{
   
            doctorList : req.body.doctorList
                


},{new:true});

});

router.put('/RegistrationNumberLab' , async (req , res) =>{
    const regLab = await RegistrationNumber.findByIdAndUpdate('5df9ef0976c4ae0a00390924',{
   
        labList : req.body.labList
            
},{new:true});
});

router.put('/RegistrationNumberPharmacy' , async (req , res) =>{
    const regPharmacy = await RegistrationNumber.findByIdAndUpdate('5df9ef0976c4ae0a00390924',{
   
        pharmacyList : req.body.pharmacyList
            

},{new:true});

});
module.exports=router;