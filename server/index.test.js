// const app = require("./index"); 
// const request = require('supertest');
// const app = require("./app");  //dont change app name var, just change path
// const express = require("express");
// const regeneratorRuntime = require("regenerator-runtime");
// const helpers = require("./helpers.js");
// const cookieParser = require("cookie-parser");

// //middleware
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cookieParser());

// //library*****
// //
// const item = {item: {number: 1, item: "testingDaTest"}}; 
// const expecting = item.item.item;

// //58 - testing recording fucntionality aka /users path //uncomment to test with cookies
// let withCookies = false; //{item: {id:"FILL_ID", MakeDaCookie: true}};
// let viewedItem = withCookies || {item: {id:"FILL_ID"} }; // will create session id for the user if one is not provided  


// // 67 testing related items 
// let relatedItem = {item: {id:"FILL_ID", name: "FILL_NAME", subCategory: "FILL_SUBCATEGORY", category: "FILL_CATEGORY", src: "FILL_SRC" } };

// describe("testing connection to server", () => {
//   test('It should respond with 200', () => {
//       return request(app).get("/").then(response => {
//           expect(response.statusCode).toBe(200)
//       })
//   });
// })

// describe('Testing to send and retrieve item from the db', () => {
//   test(`it should successfully send the item ${expecting}`, () => {
//     return request(app).post('/insert').send(item).then(response => {
//       expect(response.statusCode).toBe(200);
//     });
//   })
//   //compare whats retieved to what was supposed to be sent.. aka const item
//   test(`testing to check if ${expecting} is in the DB`, () => {
//     return request(app).get('/retrieve').send({data: expecting}).then(response => {
//       expect(response.text).toBe(expecting);
//     })
//   })

//   test("Deleting the item that was inserted", () => {
//     return request(app).post('/delete').send({data: expecting}).then(response => {
//       expect(response.statusCode).toBe(200);
//     })
//   })
// })


// //test users path
// describe('Testing users path', () => {
//   test('should send item id', () => {
//     return request(app).post('/users').send(viewedItem).then(response => {
//       expect(response.statusCode).toBe(200);
//     }) 
//   }) 
// })


// describe('Testing carousels path', () => {  
//   test('should send back object with carousel', () => {
//     return request(app).post(relatedItem).then(response => {
//       expect(typeof response.text).toBe('object');
//     })
//   })
// })

// // describe('testing recording view functionality', () => {
// //   test('should record the view from the user, and input that into the userHistory table', () => {
// //     return request(app).post('FILL_PATH').send(viewedItem).then(response => {
// //       expect(response.statusCode).toBe(200); //send back response of 200 if successful
// //     })
// //   })

// //   test('should retrieve the item that was viewed in the userHistory table', () => {
// //     return request(app).post('FILL_PATH').send(viewedItem).then(response => {
// //       expect(response.text).toBe(viewedItem);
// //     })
// //   })

// //   test('retrieving 15 also viewed items from viewedFiller', () => {
// //     return request(app).post
// //     expect(response.text).toHaveLength(15);
// //   })

// // })


// // describe('tesing perfomance on query look-up', () => { 
// //   test('looking up specific item by ID', () => {
// //     return request(app).get('/retrieve').send({data: expected}).then(response => {
// //       expect(response.text).toBe(expected);
// //     })
// //   })

// //   test('looking up items by categories', () => {
// //     return request(app).get('')
// //   })
// // })

// //create test for finding multiple items that meet the criteria
// // and have it pass if it returned something.



// // Seeding db with 1000 items - not working
// // describe('seeding the database', () => {
// //   test('Seeding DB with 1000 items', async() => {
// //     const result = await request(app).post('/seed').then(response => {
// //       expect(response.statusCode).toBe(200);
// //       result;
// //     })
// //   })
// // }) 

// // describe('Testing speed to find a specific item in the DB', () => {
// //   const findItem = {data: "FILL_ME"};
// //   return request(app).get('/retrieve').send(findItem).then(response => {
// //     expect(response.text).toBe(findItem);
// //   })
// // })

