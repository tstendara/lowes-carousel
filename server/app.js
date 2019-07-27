const express = require('express');
const faker = require("faker");
const app = express();
const db = require("../database/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("dist"));

app.get('/', (req, res) => {
    res.status(200).send("Hola world");
})

app.post('/insert', (req, res) => {
    console.log(req.body);
   
   db.insert(req.body, (err, suc) => {
    if(err){
        res.status(400).send("FAILED");
    }else{
        res.status(200).send("PASSED");
    }
   })
//    res.status(200).send("PASSED");
    
})

module.exports = app;