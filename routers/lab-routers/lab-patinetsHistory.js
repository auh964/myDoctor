const express = require('express');
const {Lab} = require('../../models/lab');
const {Patinet} = require('../../models/patinet');
const mongoose= require('mongoose');
const {verify} = require('../../utils/jwt');
const moment=require('moment');

const router = express.Router();

router.get('/getPatinetHistory/:pID' , async (req , res) =>{

    const {userInfo} = req;
    const patinet= await Patinet.findOne({pID:req.params.pID});
    if (!patinet) return res.status(400).send('Patinet ID not found.');
     
    const lastv={name:patinet.name,Date:moment().format('MMMM Do YYYY, h:mm a')};
    const lab = await Lab.findByIdAndUpdate(userInfo.id,{
                        $push: {
                                     lastVisitors : lastv
                                },   
                        $inc: {
                            "numberOfVisitors.ThisDayVisitors":1,
                            "numberOfVisitors.ThisWeekVisitors":1,
                            "numberOfVisitors.ThisMonthVisitors":1
                        }
        },{new:true});
        const lastv1={name:lab.name,Date:moment().format('MMMM Do YYYY, h:mm a'),rate:0,id:lab._id};

    const patinet1=await Patinet.findOneAndUpdate({pID:req.params.pID},{
        $push:{
            lastVisitorLabs: lastv1
        }
    },{new:true});
    if (!lab) return res.status(400).send('Doctor ID not found.');
    res.send(patinet);      
});





router.put('/addMedicalTest/:_id' , async (req , res)=>{

    const { userInfo } = req;
         const lab = await Lab.findById(userInfo.id);
         const patinet = await Patinet.findByIdAndUpdate(req.params._id,
             {
    $push : {
        "historyPatinet.medicalTest" :{
            name:lab.name,
            Date:moment().format('MMMM Do YYYY, h:mm a'),
            result:req.body.result
        }
    
    }            }, { new: true });
        
           if (!patinet) return res.status(404).send('ID was not found.');
          
           res.send(patinet);

});






    
module.exports=router;