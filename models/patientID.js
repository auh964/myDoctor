const mongoose = require('mongoose');

const patientIdSchema = new mongoose.Schema({
id :Number
});

const PatientId = mongoose.model('patientId', patientIdSchema); 

module.exports.PatientId = PatientId;