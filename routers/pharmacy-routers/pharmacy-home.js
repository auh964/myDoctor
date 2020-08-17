const express = require('express');
const {Pharmacy} = require('../../models/pharmacy');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.get('/getHome' , async (req , res) =>{
  const {userInfo} = req;
      const pharmacy = await Pharmacy.findById(userInfo.id).select({"_id" : 0});
      res.send(pharmacy);

});
module.exports=router;