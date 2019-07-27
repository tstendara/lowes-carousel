// const app = require("./index"); 
const request = require('supertest');
const app = require("./app");
const express = require("express");

app.use(express.json());
app.use(express.urlencoded());

// test('inserting hola to be in db', assert => {
//     let testItem = {number: 3, item:"hola"};

//     app.post("/testingInsertion", (req, res) => {
//         const item = testItem; //should be the item being dispensed
//         let sent = false;
//         db.insert(item ,(err, suc) => {
//           if(err){
//             throw err;
//           }else{
//               sent = true;
//               expect(sent).toBe(false);
//           }
//         }) 
//     })
// })

describe('Test the root path', () => {
  test('It should response the GET method', () => {
      return request(app).get("/").then(response => {
          expect(response.statusCode).toBe(200)
      })
  });
})

describe('Testing to send and retrieve item from the db', () => {
  const item = {number: 1, item: "testingDaTest"}
  test(`it should successfully send the item ${item}`, () => {
    return request(app).post('/insert').send(item).then(response => {
      expect(response.statusCode).toBe(200);
    });
  })


  // test("it should respond with array of length of 10", () => {
  //   return request(app).get('/testRetrieval').then(response => {
  //     expect(JSON.parse(response.text)).toHaveLength(1000000);
  //   })
    
      
  
})
