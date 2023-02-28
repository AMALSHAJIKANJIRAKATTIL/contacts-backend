const mongoose = require('mongoose');

const schema = new mongoose.Schema({
firstName:{type: String , required:true},
lastName:{type: String , required:true},
email:{type: String , required:true},
phone:{type: String , required:true},
});


let contacts=mongoose.model('contacts', schema);
module.exports = contacts;
