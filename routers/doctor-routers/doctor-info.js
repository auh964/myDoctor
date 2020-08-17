const express = require('express');
const {Doctor} = require('../../models/doctor');
const router = express.Router();
const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);
const {verify} = require('../../utils/jwt');


router.get('/getInfo', async ( req , res )=>{
const {userInfo} = req;
      const doctor = await Doctor.findById(userInfo.id).select({"_id" : 0});
      res.send(doctor);
});




router.put('/personalInfo' , async (req , res) =>{
    const {userInfo} = req; 
    const doctor = await Doctor.findByIdAndUpdate(userInfo.id,
        { 
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          specialty:req.body.specialty,
          insuranceCompaniesCovered:req.body.insuranceCompaniesCovered,
          experience:req.body.experience,
          age:req.body.age,
          gender:req.body.gender
        }, { new: true });
    
      if (!doctor) return res.status(404).send('ID was not found.');
      
      res.send(doctor);
     
});





router.put('/locationInfo' , async (req , res) =>{
    const {userInfo} = req;      
    const doctor = await Doctor.findByIdAndUpdate(userInfo.id,
        { 
            "location.Longitude":req.body.Longitude,
            "location.Latitude":req.body.Latitude,
        }, { new: true });
    
      if (!doctor) return res.status(404).send('ID was not found.');
      
      res.send(doctor);
     
});


router.put('/workHoursInfo' , async (req , res) =>{
         const {userInfo} = req;
         try{
            console.log('req.body',req.body)
             const doctor = await Doctor.findByIdAndUpdate(userInfo.id,
                { 
                    "worksHours.sat.From":req.body.sat.From,"worksHours.sat.to":req.body.sat.to,"worksHours.sat.isWorkDay":req.body.sat.isWorkDay,
                    "worksHours.sun.From":req.body.sun.From,"worksHours.sun.to":req.body.sun.to,"worksHours.sun.isWorkDay":req.body.sun.isWorkDay,
                    "worksHours.mon.From":req.body.mon.From,"worksHours.mon.to":req.body.mon.to,"worksHours.mon.isWorkDay":req.body.mon.isWorkDay,
                    "worksHours.the.From":req.body.the.From,"worksHours.the.to":req.body.the.to,"worksHours.tue.isWorkDay":req.body.the.isWorkDay,
                    "worksHours.wed.From":req.body.wed.From,"worksHours.wed.to":req.body.wed.to,"worksHours.wed.isWorkDay":req.body.wed.isWorkDay,
                    "worksHours.thu.From":req.body.thu.From,"worksHours.thu.to":req.body.thu.to,"worksHours.thu.isWorkDay":req.body.thu.isWorkDay,
                    "worksHours.fri.From":req.body.fri.From,"worksHours.fri.to":req.body.fri.to,"worksHours.fri.isWorkDay":req.body.fri.isWorkDay
                }, { new: true });
                
                if (!doctor) return res.status(404).send('ID was not found.');
                
                res.send(doctor);
            }catch(error){
                console.log('workHoursInfo ',error.message)
            }
         
     });



router.put('/changePassword' , async (req , res) =>{
    const {userInfo} = req;
    const validPassword = await Doctor.findOne({_id:userInfo.id,password:req.body.oldPassword});
    if (!validPassword) return res.status(400).send('Invalid password.');

     const doctor = await Doctor.findByIdAndUpdate(userInfo.id,
         { 
             password:req.body.password
         }, { new: true });
    
       if (!doctor) return res.status(404).send('ID was not found.');
      
       res.send(doctor);
     
 });

 router.get('/deleted/:password' , async (req , res) =>{
    const {userInfo} = req;
    console.log(userInfo);
        const doctor1 = await Doctor.findById(userInfo.id);
        if(doctor1.password!==req.params.password)
        return res.status(400).send('Invalid password');
  
        const doctor = await Doctor.findByIdAndRemove(userInfo.id);
        res.send('Deleted!');
  });
  

module.exports = router;