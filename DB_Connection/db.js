const mongoose =require('mongoose');

const dbconnect = async ()=>{
    mongoose.connect('mongodb+srv://amalshaji:amal2001@cluster0.fguegcf.mongodb.net/Contacts',{ useNewUrlParser: true });
    mongoose.connection.on('connected',()=> console.log("Database Connected!!!"));
    mongoose.connection.on('error',(e)=>console.log(e));
    mongoose.connection.on('disconnected',()=>console.log("------------Database Disconnected---------"))
}

module.exports= dbconnect;