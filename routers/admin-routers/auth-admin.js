const {Admin} = require('../../models/admin');
const express = require('express');
const {generateToken,verify} = require('../../utils/jwt');

const router = express.Router();



router.post('/login', async (req, res ) => {
  try{
  let doctor = await Admin.findOne({ email: req.body.email });
   if (!doctor) return res.send('Invalid email or password.');

  const validPassword = await Admin.findOne({ password: req.body.password });
  if (!validPassword) return res.send('Invalid email or password.');

  const {_id,email}=  doctor;
  const token =  generateToken({id: _id ,email});
  res.json({token : token});
}catch(err){
  console.log("Error : ",err);
}
});
router.get('/jwtToken',async(req,res)=>{
    const {token} = req.headers;
    const isVerified = verify(token);
    res.json({verfied : !!isVerified});
    });


module.exports = router;