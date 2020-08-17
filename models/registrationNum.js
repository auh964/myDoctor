const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



const registrationSchema = new mongoose.Schema({
    doctorList: {type:Array, default:[]},
    pharmacyList: {type:Array, default:[]},
    labList: {type:Array, default:[]}
});

const RegistrationNumber = mongoose.model('RegistrationNumber', registrationSchema);

module.exports.RegistrationNumber = RegistrationNumber;