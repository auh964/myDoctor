const express = require('express');
const {RegistrationNumber} = require('../../models/registrationNum');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.get('/nameAllLabs' , async (req , res) =>{
     
      const lab = await RegistrationNumber.find().select({labList:1});
      res.send(lab);

});
module.exports=router;