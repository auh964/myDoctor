const express = require('express');
const {Doctor} = require('../../models/doctor');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);

const router = express.Router();
router.get('/getHome' , async (req , res ) =>{
      const {userInfo} = req;
      const doctor = await Doctor.findById(userInfo.id).select({"_id" : 0});
      res.send(doctor);
});
module.exports=router;