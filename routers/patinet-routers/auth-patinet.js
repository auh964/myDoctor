const {Patinet} = require('../../models/patinet');
const {PatientId} = require('../../models/patientID')
const {generateToken,verify} = require('../../utils/jwt');
const express = require('express');

const router = express.Router();



router.post('/login', async (req, res) => {
  try{
    let patinet = await Patinet.findOne({ email: req.body.email });
     if (!patinet) return res.send('Invalid email or password.');
  
    const validPassword = await Patinet.findOne({ password: req.body.password });
    if (!validPassword) return res.send('Invalid email or password.');
  
    const {_id,name ,email}=  patinet;
    const token =  generateToken({id: _id ,name ,email});
    res.json({token : token});
  }catch(err){
    console.log("Error : ",err);
  }
});

router.post('/signup', async (req, res) => {

  let patientId = await PatientId.findByIdAndUpdate('5df766b7e364ca1e6cd2026f',{$inc:{id:1}},{new:true});

  let patinet = await Patinet.findOne({ email: req.body.Email });
  if (patinet) return res.status(400).send('User already registered.');

  patinet = new Patinet({
    name: req.body.Username,
    email: req.body.Email,
    password: req.body.password,
    pID:patientId.id
  });
  const result=await patinet.save();
  res.status(200).send("Signup successfull");
});

router.get('/jwtToken',async(req,res)=>{
const {token} = req.headers;
const isVerified = verify(token);
res.json({verfied : !!isVerified});
});

module.exports = router;