const mongoose =require('mongoose');
const express=require('express');
const app=express();
const contacts=require('./models/data')
const dbconnect=require('./DB_Connection/db')
dbconnect();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.json());


app.post('/v1/contacts',async(req,res)=>{
    try{
        console.log(req.body);
        await contacts.insertMany(req.body).then((val)=>{
            return  res.send(val);

        }).catch((e)=>{
            return res.status(404).send({
                "error": `Missing required field(s): ${e}`
                }
                )
        });
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/v1/contacts',async(req,res)=>{
    try{
        let Data=await contacts.find();
       
        res.send(Data);
    }catch(e){
        res.status(500).send(e)
    }
});

app.get('/v1/contacts/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let Data=await contacts.find({_id:id});
        if(Data.length!=0){
            return  res.send(Data);
        }else{
            return res.status(404).send({"error": "There is no contact with that id"})
        }
    }catch(e){
        res.status(404).send({"error": "There is no contact with that id"})
    }
});

app.delete('/v1/contacts/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let Data=await contacts.deleteOne({_id:id});
       
        if(Data){
            return  res.send(Data);
        }else{
            return res.status(204).send({"error": "Deletion Failed"})
        }
    }catch(e){
        res.status(204).send({"error": "Deletion Failed"})
    }
});


app.put('/v1/contacts/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        await contacts.findByIdAndUpdate(id, req.body, { new: true })
  .then(updated => {
    console.log(updated);
    return  res.status(204).send(updated);
  })
  .catch(error => {
    console.error(error);
    return res.status(404).send({"error": "There is no contact with that id"})
  });
    }catch(e){
        res.status(404).send({"error": "There is no contact with that id"})
    }
});


app.patch('/v1/contacts/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        console.log(req.body);
        await contacts.updateOne({_id:id},{$set: req.body})
  .then(updated => {
    console.log(updated);
    return  res.status(200).send(updated);
  })
  .catch(error => {
    console.error(error);
    return res.status(404).send({"error": "There is no contact with that id"})
  });
    }catch(e){
        res.status(404).send({"error": "There is no contact with that id"})
    }
});



const port=8000;
app.listen(port,()=>console.log(`Listening on ${port}`))