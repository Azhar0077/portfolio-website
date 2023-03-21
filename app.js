const fs = require('fs')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const { mainModule } = require('process');

main().catch(err => console.log(err));
async function main () {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactform')
}
// const router = express.Router();
// const Place = require('../models/place');

const app = express();
const port = 80;


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
})
const Contact = mongoose.model('Contact',contactSchema)

const rootDir = path.join(__dirname,'static'); 

const viewsDir = path.join(__dirname,'views');

app.use(express.static(rootDir));
app.get('/',(req,res) =>{
    res.sendFile('index.html',{root : viewsDir});
});

app.get('/contact',(req,res)=>{
    res.sendFile('contact.html',{root : viewsDir})
});

app.post('/contact',(req,res)=>{
const myData = new Contact(req.body);
myData.save().then(()=>{
    res.send('saved in database')
}).catch(()=>{
    res.status(404).send('Not Found')
});
});

// router.get('/search', async (req, res) => {
//   const { query } = req.query;
//   const regex = new RegExp(query, 'i');
//   const places = await Place.find({ name: regex });
//   res.json(places);
// });


app.listen(port,()=>{
    console.log(`the server starting in port ${port}`);
});