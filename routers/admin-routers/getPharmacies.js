const express = require('express');
const {RegistrationNumber} = require('../../models/registrationNum');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.get('/nameAllPharmacies' , async (req , res) =>{

      const pharmacy = await RegistrationNumber.find().select({pharmacyList:1});
      res.send(pharmacy);
      
});
module.exports=router;