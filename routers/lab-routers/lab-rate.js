const express = require('express');
const {Lab} = require('../../models/lab');
const mongoose= require('mongoose');
const {Patinet}=require('../../models/patinet');

// const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);
const router = express.Router();
router.put('/rateLab' , async (req , res)=>{
      const {userInfo} = req;
      console.log('UI',req.userInfo)
      try{
            
            const patinet = await Patinet.update({_id:userInfo.id,"lastVisitorLabs.Date":req.body.Date},{
              "lastVisitorLabs.$.rate":req.body.rate
            });
            const id = req.body.id;
            const x = req.body.rate;
            let lab = null;
            if (x===1){
                  lab = await Lab.findByIdAndUpdate(id,{
                        $inc:{"rate.Star_1":1}
                    },{new:true});       
              }
              else if (x===2){
                  lab = await Lab.findByIdAndUpdate(id,{
                          $inc:{"rate.Star_2":1}
                    },{new:true});       
              }
              else if (x===3){
                  lab = await Lab.findByIdAndUpdate(id,{
                          $inc:{"rate.Star_3":1}
                    },{new:true});       
              }else if (x===4){
                  lab = await Lab.findByIdAndUpdate(id,{
                          $inc:{"rate.Star_4":1}
                    },{new:true});       
              }else if (x===5){
                  lab = await Lab.findByIdAndUpdate(id,{
                          $inc:{"rate.Star_5":1}
                    },{new:true});       
              }     
              res.status(200).send(lab);
  
        }catch(error){
              console.log('bk', error.message)
        }
  });
  
module.exports = router;