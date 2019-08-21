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

app.post('/seed', (req, res) => {

    let count = 0;
    let data = {};
  
    let x = 1;
    let y = 10;
    let interval = 10;

    function resolveAfter2Seconds(start, end) {

    return new Promise(resolve => {
        setTimeout(() => {
        for(let i=start; i<=end; i++){
            let alt = faker.commerce.productName(); //same as name
            let src = faker.image.avatar();  //also name of obj as string ex: "0"{"alt": "name of product"}
            let category = faker.commerce.product();
            let subCategory = faker.commerce.department();
            data[i] = {"alt": alt, "src": src, "id": i, "category": category, "subCategory": subCategory, "name": alt}
        }
        resolve(data);
        }, 2000);
    });
    }

    async function asyncCall(start, end) {
    
        var result = await resolveAfter2Seconds(start, end);
        result;
        //   console.log(result);
        const Push = await queryTest(data);
        Push;
        // console.log(data);
        data = {};
        count ++;
        //   console.log(count);
        if(count !== 1){
            beg = x + (count * interval);
            end = beg + interval - 1;
            // console.log(beg, end);
            asyncCall(beg, end);
        }
    // expected output: 'resolved'
    }

    async function queryTest(data){ 
        // console.log(data);
        for(let id in data){
            console.log(id[0].src);
            db.insert({number: id.src, item: id.alt}, (err, suc) => {
                if(err) console.log("ERR in test server");
            })
        }

    }

    if(count === 0){
        asyncCall(x, y);
    }
  
    res.status(200).send("SEEDED");
})

app.post('/insert', (req, res) => {
    console.log(req.body.item);
   
   db.insert(req.body.item, (err, suc) => {
    if(err){
        res.status(400).send("FAILED");
    }else{
        res.status(200).send("PASSED");
    }
   })
//    res.status(200).send("PASSED");
    
})

app.get('/retrieve', (req, res) => {
    // console.log(req.body);

    db.selectOneByName(req.body.data, (err, suc) => {
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(suc);
        }
    })
})

app.post('/delete', (req, res) => {
    
    db.del(req.body.data, (err, suc) => {
        if(err){
            res.status(400).send("FAILED");
        }else{
            res.status(200).send("PASSED");
        }
    })
})



module.exports = app;