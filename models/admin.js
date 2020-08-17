const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
 email:String,
 password: String ,
 contactUs:{ type : Array , default : [] }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports.Admin = Admin;