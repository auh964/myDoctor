const express = require('express');
const {Admin} = require('../../models/admin');
const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);
const router = express.Router();

router.put('/addMsg' , async (req , res)=>{
    
    const contact={name:req.body.name,
        subject:req.body.subject,
        email:req.body.email,
        msg:req.body.msg
    };
   
    const admin = await Admin.findByIdAndUpdate('5df9f1b0977f4e20643b28d6',{
        $push: {
            contactUs : contact
                }
},{new:true});
if (!admin) return res.status(400).send(' ID not found.');
    res.send(admin);
});
module.exports=router;