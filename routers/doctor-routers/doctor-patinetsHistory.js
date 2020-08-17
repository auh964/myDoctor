const express = require('express');
const jwt = require('jsonwebtoken');
const {Doctor} = require('../../models/doctor');
const {Patinet} = require('../../models/patinet');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
const moment=require('moment');

const router = express.Router();

router.get('/getPatinetHistory/:pID' , async (req , res) =>{
   const {userInfo} = req;
    console.log('PID',req.params.pID)
    const patinet= await Patinet.findOne({pID:req.params.pID});
    if (!patinet) return res.status(400).send('Patinet ID not found.');
    const lastv={name:patinet.name,Date:moment().format('MMMM Do YYYY, h:mm a')};
    const doctor = await Doctor.findByIdAndUpdate(userInfo.id,{
                        $push: {
                                     lastVisitors : lastv
                                },   
                        $inc: {
                            "numberOfVisitors.ThisDayVisitors":1,
                            "numberOfVisitors.ThisWeekVisitors":1,
                            "numberOfVisitors.ThisMonthVisitors":1
                        }
        },{new:true});
        const lastv1={name:doctor.name,Date:moment().format('MMMM Do YYYY, h:mm a'),rate:0,id:doctor._id};

        const patinet1=await Patinet.findOneAndUpdate({pID:req.params.pID},{
            $push:{
                lastVisitorDoctors: lastv1
            }
        },{new:true});
    if (!doctor) return res.status(400).send('Doctor ID not found.');
    res.send(patinet);
});


router.put('/addChronicDiseases/:_id', async (req, res) => {
    const { userInfo } = req;
    const doctor = await Doctor.findById(userInfo.id);
    const patinet = await Patinet.findByIdAndUpdate(req.params._id,
        {
            $push: {
                "historyPatinet.chronicDiseases": {
                    name: doctor.name,
                    Date: moment().format('MMMM Do YYYY, h:mm a'),
                    nameOfDisease: req.body.title
                }

            }
        }, { new: true });

    if (!patinet) return res.status(404).send('ID was not found.');

    res.send(patinet);

});





router.put('/addMedicalDiagnosis/:_id' , async (req , res)=>{
    const {userInfo} = req;
        const doctor = await Doctor.findById(userInfo.id);
        
             const patinet = await Patinet.findByIdAndUpdate(req.params._id,
                 {
                    $push : {
                        "historyPatinet.medicalDiagnosis" :{
                            name:doctor.name,
                            Date:moment().format('MMMM Do YYYY, h:mm a'),
                            drugs:req.body.drugs.replace(/\s*,\s*/ig,",").split(',') || [],
                            MedAnalysis:req.body.MedAnalysis.replace(/\s*,\s*/ig,",").split(',') || [],
                            description:req.body.description
                        }
                    
                    }             }, { new: true });
            
               if (!patinet) return res.status(404).send('ID was not found.');
              
               res.send(patinet);
    
    });
    
module.exports=router;