const express = require('express');
const {Patinet} = require('../../models/patinet');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);

const router = express.Router();



router.get('/getPatinetHome' , async (req , res) =>{
      const {userInfo} = req;
      const patinet = await Patinet.findById(userInfo.id);
      res.send(patinet);
});
module.exports=router;