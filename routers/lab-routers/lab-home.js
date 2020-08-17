const express = require('express');
const {Lab} = require('../../models/lab');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.get('/getHome' , async (req , res) =>{
  const {userInfo} = req;
      const lab = await Lab.findById(userInfo.id).select({"_id" : 0});
      res.send(lab);

});
module.exports=router;