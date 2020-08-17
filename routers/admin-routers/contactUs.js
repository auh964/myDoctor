const express = require('express');
const {Admin} = require('../../models/admin');
const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.get('/showMsg' , async (req , res) =>{
    let admin = await Admin.find();
     res.send(admin);
});

module.exports=router;