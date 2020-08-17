const express = require('express');
const {RegistrationNumber} = require('../../models/registrationNum');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.get('/nameAllDoctors' , async (req , res) =>{

      const doctor = await RegistrationNumber.find().select({doctorList:1});
      res.send(doctor);

});
module.exports=router;