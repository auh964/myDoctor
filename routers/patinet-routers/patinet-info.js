const express = require('express');
const {Patinet} = require('../../models/patinet');
const router = express.Router();
const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);
const {verify} = require('../../utils/jwt');


router.get('/getInfo', async ( req , res )=>{
    const {userInfo} = req;
    const patinet = await Patinet.findById(userInfo.id);
      res.send(patinet);
});





router.put('/changeInfo' , async (req , res) =>{    
    const {userInfo} = req; 
    const patinet = await Patinet.findByIdAndUpdate(userInfo.id,
        { 
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
          gender: req.body.gender,
          phoneNumber: req.body.phoneNumber,
          address:req.body.address
        }, { new: true });
    
      if (!patinet) return res.status(404).send('ID was not found.');
      
      res.send(patinet);
     
});

router.put('/changePassword' , async (req , res) =>{
    const {userInfo} = req;
    const validPassword = await Patinet.findOne({_id:userInfo.id,password:req.body.oldPassword});
    if (!validPassword) return res.status(400).send('Invalid password.');

     const patinet = await Patinet.findByIdAndUpdate(userInfo.id,
         { 
             password:req.body.password
         }, { new: true });
    
       if (!patinet) return res.status(404).send('ID was not found.');
      
       res.send(patinet);
     
 });
 router.get('/deleted/:password' , async (req , res) =>{
  const {userInfo} = req;
  console.log(userInfo);
      const patinet = await Patinet.findById(userInfo.id);
      if(patinet.password!==req.params.password)
      return res.status(400).send('Invalid password');

      const patinet1 = await Patinet.findByIdAndRemove(userInfo.id);
      res.send('Deleted!');
});



module.exports = router;