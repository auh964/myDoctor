const express = require('express');
const jwt = require('jsonwebtoken');
const {Lab} = require('../../models/lab');
const router = express.Router();
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);


router.get('/getInfo', async ( req , res )=>{
     
    const {userInfo} = req;

      const lab = await Lab.findById(userInfo.id);
      res.send(lab);
});






router.put('/personalInfo' , async (req , res) =>{
  
    const {userInfo} = req; 
    const lab = await Lab.findByIdAndUpdate(userInfo.id,
        { 
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          insuranceCompaniesCovered:req.body.insuranceCompaniesCovered,
        }, { new: true });
    
      if (!lab) return res.status(404).send('ID was not found.');
      
      res.send(lab);
     
});









router.put('/locationInfo' , async (req , res) =>{
    
    const {userInfo} = req; 
    const lab = await Lab.findByIdAndUpdate(userInfo.id,
        { 
            "location.Longitude":req.body.Longitude,
            "location.Latitude":req.body.Latitude,
        }, { new: true });
    
      if (!lab) return res.status(404).send('ID was not found.');
      
      res.send(lab);
     
});


router.put('/workHoursInfo' , async (req , res) =>{
        
    const {userInfo} = req;
         const lab = await Lab.findByIdAndUpdate(userInfo.id,
             { 
                "worksHours.sat.From":req.body.sat.From,"worksHours.sat.to":req.body.sat.to,"worksHours.sat.isWorkDay":req.body.sat.isWorkDay,
                "worksHours.sun.From":req.body.sun.From,"worksHours.sun.to":req.body.sun.to,"worksHours.sun.isWorkDay":req.body.sun.isWorkDay,
                "worksHours.mon.From":req.body.mon.From,"worksHours.mon.to":req.body.mon.to,"worksHours.mon.isWorkDay":req.body.mon.isWorkDay,
                "worksHours.the.From":req.body.the.From,"worksHours.the.to":req.body.the.to,"worksHours.the.isWorkDay":req.body.the.isWorkDay,
                "worksHours.wed.From":req.body.wed.From,"worksHours.wed.to":req.body.wed.to,"worksHours.wed.isWorkDay":req.body.wed.isWorkDay,
                "worksHours.thu.From":req.body.thu.From,"worksHours.thu.to":req.body.thu.to,"worksHours.thu.isWorkDay":req.body.thu.isWorkDay,
                "worksHours.fri.From":req.body.fri.From,"worksHours.fri.to":req.body.fri.to,"worksHours.fri.isWorkDay":req.body.fri.isWorkDay
                 }, { new: true });
        
           if (!lab) return res.status(404).send('ID was not found.');
          
           res.send(lab);
         
     });



router.put('/changePassword' , async (req , res) =>{

    const {userInfo} = req;
    const validPassword = await Lab.findOne({_id:userInfo.id,password:req.body.oldPassword});
    if (!validPassword) return res.status(400).send('Invalid password.');

     const lab = await Lab.findByIdAndUpdate(userInfo.id,
         { 
             password:req.body.password
         }, { new: true });
    
       if (!lab) return res.status(404).send('ID was not found.');
      
       res.send(lab);
     
 });
 router.get('/deleted/:password' , async (req , res) =>{
    const {userInfo} = req;
    console.log(userInfo);
        const lab1 = await Lab.findById(userInfo.id);
        if(lab1.password!==req.params.password)
        return res.status(400).send('Invalid password');
  
        const lab = await Lab.findByIdAndRemove(userInfo.id);
        res.send('Deleted!');
  });
  


module.exports = router;