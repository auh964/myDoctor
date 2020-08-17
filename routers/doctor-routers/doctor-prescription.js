const express = require('express');
const {Doctor} = require('../../models/doctor');
const {verify} = require('../../utils/jwt');

const router = express.Router();

router.get('/getPrescription' , async (req , res) =>{
    const {userInfo} = req;
    const doctor = await Doctor.findById(userInfo.id).select({"_id" : 0 , "prescription" : 1});
      res.send(doctor);
});


router.put('/addPrescription' , async (req , res)=>{
    const {userInfo} = req;
            const doctor = await Doctor.findByIdAndUpdate(userInfo.id,{
                    prescription : req.body.prescription}
                    , { new: true });
                            
               if (!doctor) return res.status(404).send('ID was not found.');
              
               res.send(doctor.prescription);
});

module.exports=router;