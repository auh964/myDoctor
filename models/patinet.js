const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const patinetSchema = new mongoose.Schema({
    name: {type:String,default:'' , trim:true},
    age:{type : Number , default:0},
    pID:{type : Number }, 
    gender: {type:String,default:''},
    phoneNumber: {type:String,default:''},
    address:{type: String , default: ''},
    email: {type:String,default:''},
    password: {type:String,default:''},
    insurance: {type:Array,default:[]},
    historyPatinet:{
      medicalDiagnosis: {type:Array, default:[]},
      chronicDiseases:{ type:Array , default:[]},
      medicalTest:{type:Array , default:[] },
      pharmaceuyical:{type:Array , default:[]}
    },
    lastVisitorDoctors:{type:Array, default:[]},
    lastVisitorLabs:{type:Array, default:[]},
    lastVisitorPharmacies:{type:Array, default:[]}
});

// patinetSchema.methods.generateAuthToken = function() { 
//     const token = jwt.sign({ _id: this._id }, 'jwtPrivateKey');
//     return token;
//   }
    
    
    const Patinet = mongoose.model('Patinet', patinetSchema);

    module.exports.Patinet= Patinet;