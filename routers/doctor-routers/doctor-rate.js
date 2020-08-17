const express = require('express');
const {Doctor} = require('../../models/doctor');
const mongoose= require('mongoose');
const {Patinet}=require('../../models/patinet');

// const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);
const router = express.Router();
router.put('/rateDoctor' , async (req , res)=>{
      const {userInfo} = req;
      console.log('UI',req.userInfo)
      try{
            
            const patinet = await Patinet.update({_id:userInfo.id,"lastVisitorDoctors.Date":req.body.Date},{
              "lastVisitorDoctors.$.rate":req.body.rate
            });
            const id = req.body.id;
            const x = req.body.rate;
            let pharmacy = null;
            if (x===1){
                  doctor = await Doctor.findByIdAndUpdate(id,{
                        $inc:{"rate.Star_1":1}
                    },{new:true});       
              }
              else if (x===2){
                  doctor = await Doctor.findByIdAndUpdate(id,{
                          $inc:{"rate.Star_2":1}
                    },{new:true});       
              }
              else if (x===3){
                  doctor = await Doctor.findByIdAndUpdate(id,{
                          $inc:{"rate.Star_3":1}
                    },{new:true});       
              }else if (x===4){
                  doctor = await Doctor.findByIdAndUpdate(id,{
                          $inc:{"rate.Star_4":1}
                    },{new:true});       
              }else if (x===5){
                  doctor = await Doctor.findByIdAndUpdate(id,{
                          $inc:{"rate.Star_5":1}
                    },{new:true});       
              }     
              res.status(200).send(doctor);
  
        }catch(error){
              console.log('bk', error.message)
        }
  });
  
module.exports = router;