const express = require('express');
const {Pharmacy} = require('../../models/pharmacy');
const mongoose= require('mongoose');
const {Patinet}=require('../../models/patinet');
// const {verify} = require('../../utils/jwt');
mongoose.set('useFindAndModify', false);
const router = express.Router();
router.put('/ratePharmacy' , async (req , res)=>{
    const {userInfo} = req;
    console.log('UI',req.userInfo)
    try{
          
          const patinet = await Patinet.update({_id:userInfo.id,"lastVisitorPharmacies.Date":req.body.Date},{
            "lastVisitorPharmacies.$.rate":req.body.rate
          });
          const id = req.body.id;
          const x = req.body.rate;
          let pharmacy = null;
          if (x===1){
                pharmacy = await Pharmacy.findByIdAndUpdate(id,{
                      $inc:{"rate.Star_1":1}
                  },{new:true});       
            }
            else if (x===2){
                  pharmacy = await Pharmacy.findByIdAndUpdate(id,{
                        $inc:{"rate.Star_2":1}
                  },{new:true});       
            }
            else if (x===3){
                  pharmacy = await Pharmacy.findByIdAndUpdate(id,{
                        $inc:{"rate.Star_3":1}
                  },{new:true});       
            }else if (x===4){
                  pharmacy = await Pharmacy.findByIdAndUpdate(id,{
                        $inc:{"rate.Star_4":1}
                  },{new:true});       
            }else if (x===5){
                  pharmacy = await Pharmacy.findByIdAndUpdate(id,{
                        $inc:{"rate.Star_5":1}
                  },{new:true});       
            }     
            res.status(200).send(pharmacy);

      }catch(error){
            console.log('bk', error.message)
      }
});
      
module.exports = router;