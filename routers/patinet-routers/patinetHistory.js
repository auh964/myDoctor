const express = require('express');
const {verify} = require('../../utils/jwt');
const {Patinet} = require('../../models/patinet');
const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.get('/getInfo' , async (req , res) =>{
    const {userInfo} = req;
      const patinet = await Patinet.findById(userInfo.id);
      res.send(patinet);
});
module.exports=router;