const {Doctor} = require('../../models/doctor');
const {RegistrationNumber} = require('../../models/registrationNum');
const express = require('express');
const router = express.Router();
const {generateToken,verify} = require('../../utils/jwt');

router.post('/login', async (req, res ) => {
  try{
  let doctor = await Doctor.findOne({ email: req.body.email });
   if (!doctor) return res.send('Invalid email or password.');

  const validPassword = await Doctor.findOne({ password: req.body.password });
  if (!validPassword) return res.send('Invalid email or password.');

  const {_id,name ,email}=  doctor;
  const token =  generateToken({id: _id ,name ,email});
  res.json({token : token});
}catch(err){
  console.log("Error : ",err);
}
});

router.post('/signup', async (req, res) => {
  let doctor = await Doctor.findOne({ email: req.body.Email });
  if (doctor) return res.status(400).send('User already registered.');
  console.log(req);
  
   let test = await RegistrationNumber.find({"doctorList.name" : req.body.Username||req.body.Username.toLowerCase()||req.body.Username.toUpperCase() , "doctorList.num" :req.body.sup});
   if (!test) return res.status(400).send('Invalid Doctor name or registration number.')
  doctor = new Doctor({
    name: req.body.Username,
    email: req.body.Email,
    password: req.body.password,
    registrationNum: req.body.sup
  });
  const result=await doctor.save();
  res.status(200).send("Signup successfull");
});

router.get('/jwtToken',async(req,res)=>{
const {token} = req.headers;
const isVerified = verify(token);
res.json({verfied : !!isVerified});
});

module.exports = router;