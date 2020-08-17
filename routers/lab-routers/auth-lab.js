const {Lab} = require('../../models/lab');
const {RegistrationNumber} = require('../../models/registrationNum');
const {generateToken,verify} = require('../../utils/jwt');
const express = require('express');

const router = express.Router();



router.post('/login', async (req, res) => {

  try{
    let lab = await Lab.findOne({ email: req.body.email });
     if (!lab) return res.send('Invalid email or password.');
  
    const validPassword = await Lab.findOne({ password: req.body.password });
    if (!validPassword) return res.send('Invalid email or password.');
  
    const {_id,name ,email}=  lab;
    const token =  generateToken({id: _id ,name ,email});
    res.json({token : token});
  }catch(err){
    console.log("Error : ",err);
  }
});

router.post('/signup', async (req, res) => {
  let lab = await Lab.findOne({ email: req.body.Email });
  if (lab) return res.status(400).send('User already registered.');

   let test = await RegistrationNumber.find({"labList.name" :  req.body.Username||req.body.Username.toLowerCase()||req.body.Username.toUpperCase() , "labList.num" :req.body.sup});
   if (!test) return res.status(400).send('Invalid Lab name or registration number.')
  lab = new Lab({
    name: req.body.Username,
    email: req.body.Email,
    password: req.body.password,
    registrationNum: req.body.sup
  });
  const result=await lab.save();
  res.status(200).send("Signup successfull");
});

router.get('/jwtToken',async(req,res)=>{
const {token} = req.headers;
const isVerified = verify(token);
res.json({verfied : !!isVerified});
});

module.exports = router;