const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const doctorSchema = new mongoose.Schema({
    name: {type:String,trim:true},
    age:{ 
        type : Number,
        default : 0
    }, 
    gender: {
        type : String,
         default : ''
    },
    specialty: {type:Array, default:[]},
    experience: {
      type : String,
      default : '',
      trim:true
    },
    registrationNum: {type:Number ,trim:true},
    phoneNumber: {type:String,default : ''},
    email: {type:String,trim:true},
    password: {type:String,trim:true},
    location:{Longitude:{type : SchemaTypes.Double , default :35.930359 },Latitude:{type : SchemaTypes.Double, default :31.963158}},
    insuranceCompaniesCovered:{type:Array, default:[]},
    worksHours: {
        sat: { From :{ type : String , default : '2019-12-22T21:38:47.000Z' }, to :{ type :  String , default : '2019-12-22T21:38:47.000Z'},isWorkDay:{type:Boolean,default:false}},
        sun: { From :{ type : String , default : '2019-12-22T21:38:47.000Z' }, to :{ type :  String , default : '2019-12-22T21:38:47.000Z'},isWorkDay:{type:Boolean,default:false}},
        mon: { From :{ type : String , default : '2019-12-22T21:38:47.000Z' }, to :{ type :  String , default : '2019-12-22T21:38:47.000Z'},isWorkDay:{type:Boolean,default:false}},
        the: { From :{ type : String , default : '2019-12-22T21:38:47.000Z' }, to :{ type :  String , default : '2019-12-22T21:38:47.000Z'},isWorkDay:{type:Boolean,default:false}},
        wed: { From :{ type : String , default : '2019-12-22T21:38:47.000Z' }, to :{ type :  String , default : '2019-12-22T21:38:47.000Z'},isWorkDay:{type:Boolean,default:false}},
        thu: { From :{ type : String , default : '2019-12-22T21:38:47.000Z' }, to :{ type :  String , default : '2019-12-22T21:38:47.000Z'},isWorkDay:{type:Boolean,default:false}},
        fri: { From :{ type : String , default : '2019-12-22T21:38:47.000Z' }, to :{ type :  String , default : '2019-12-22T21:38:47.000Z'},isWorkDay:{type:Boolean,default:false}}
    },
    isOpen:{
       type : Boolean,
       default : false
    },
    rate:{
        Star_1:{ type : Number , default : 0},
        Star_2:{ type : Number , default : 0},
        Star_3:{ type : Number , default : 0},
        Star_4:{ type : Number , default : 0},
        Star_5:{ type : Number , default : 0},
        Star_AVG:{ type : Number , default : 0}
    },
    numberOfVisitors:{
        ThisDayVisitors:{type : Number , default : 0},
        ThisWeekVisitors:{type : Number , default : 0},
        ThisMonthVisitors:{type : Number , default : 0}
    },
    lastVisitors:{ type : Array , default : [] },
    prescription:{ type : Array , default : [] },
    photo:{type:String, default:''}
});


// doctorSchema.methods.generateAuthToken = function() { 
//     const token = jwt.sign({ _id: this._id }, 'jwtPrivateKey');
//     return token;
//   }

  const Doctor = mongoose.model('Doctor', doctorSchema);
  
  module.exports.Doctor= Doctor;

