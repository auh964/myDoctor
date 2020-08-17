const express = require('express');
const {Lab} = require('../../models/lab');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');

const router = express.Router();

router.get('/getMedicalTest' , async (req , res) =>{
    
    const {userInfo} = req;
    const lab = await Lab.findById(userInfo.id).select({"_id" : 0 , "medicalAnalisys" : 1});
      res.send(lab);
});

router.put('/addMedicalTest' , async (req , res)=>{
    
         const {userInfo} = req;
            const lab = await Lab.findByIdAndUpdate(userInfo.id,{
                medicalAnalisys : req.body.medicalAnalisys}
                    , { new: true });
                            
               if (!lab) return res.status(404).send('ID was not found.');
              
               res.send(lab.medicalAnalisys);
});

module.exports=router;