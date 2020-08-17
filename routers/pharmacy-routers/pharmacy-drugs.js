const express = require('express');
const {Pharmacy} = require('../../models/pharmacy');
const mongoose= require('mongoose');

const router = express.Router();

router.get('/getDrugs' , async (req , res) =>{
    
    const {userInfo} = req;
    const pharmacy = await Pharmacy.findById(userInfo.id).select({"_id" : 0 , "drug" : 1});
      res.send(pharmacy);
});

router.put('/addDrugs' , async (req , res)=>{

            const {userInfo} = req;
            const pharmacy = await Pharmacy.findByIdAndUpdate(userInfo.id,{
                drug : req.body.drug}
                    , { new: true });
                            
               if (!pharmacy) return res.status(404).send('ID was not found.');
              
               res.send(pharmacy.drug);
});

module.exports=router;