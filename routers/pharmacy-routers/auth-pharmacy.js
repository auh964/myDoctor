const {Pharmacy} = require('../../models/pharmacy');
const {RegistrationNumber} = require('../../models/registrationNum');
const mongoose = require('mongoose');
const {generateToken,verify} = require('../../utils/jwt');
const express = require('express');

const router = express.Router();



router.post('/login', async (req, res) => {

  try{
    let pharmacy = await Pharmacy.findOne({ email: req.body.email });
     if (!pharmacy) return res.send('Invalid email or password.');
  
    const validPassword = await Pharmacy.findOne({ password: req.body.password });
    if (!validPassword) return res.send('Invalid email or password.');
  
    const {_id,name ,email}=  pharmacy;
    const token =  generateToken({id: _id ,name ,email});
    res.json({token : token});
  }catch(err){
    console.log("Error : ",err);
  }
});

router.post('/signup', async (req, res) => {
  let pharmacy = await Pharmacy.findOne({ email: req.body.Email });
  if (pharmacy) return res.status(400).send('User already registered.');
console.log(req);
let test = await RegistrationNumber.find({"pharmacyList.name" : req.body.Username||req.body.Username.toLowerCase()||req.body.Username.toUpperCase() , "pharmacyList.num" :req.body.sup});
if (!test) return res.status(400).send('Invalid pharmacy name or registration number.')
pharmacy = new Pharmacy({
    name: req.body.Username,
    email: req.body.Email,
    password: req.body.password,
    registrationNum: req.body.sup
  });
  const result=await pharmacy.save();
  res.status(200).send("Signup successfull");
});

router.get('/jwtToken',async(req,res)=>{

const {token} = req.headers;
const isVerified = verify(token);
res.json({verfied : !!isVerified});
});

module.exports = router;