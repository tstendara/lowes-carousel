const app = require("./app");
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("../database/index.js"); //changed routing to new index
// const db = require("../database/index.js");
// const middleware = require("./middleware.js");
// const helpers = require("./helpers.js");
const faker = require("faker");
// const test = require('./dataGenerator.js');
const PORT = 3000;



app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
// app.use(cors(middleware.corsOptions));

app.use(express.static("dist"));




// app.get("/testingRequest", (req, res) => {
  
//   db.selectOneById(  ,(err, suc))
// })

app.get("/seedDaDB", (req, res) => {
  
  let data = {};
  let count = 0;
  let start = 1;
  let end = 10;

  const helper = (start, end) => {

    for(productID=start; productID <= end; productID++){
      let alt = faker.commerce.productName(); //same as name
      let src = faker.image.avatar();  //also name of obj as string ex: "0"{"alt": "name of product"}
      let category = faker.commerce.product();
      let subCategory = faker.commerce.department();
      data[productID] = {"alt": alt, "src": src, "id": productID, "category": category, "subCategory": subCategory, "name": alt}
    }

    //query

    count ++;
    let done = true;
  }

  if(!done){ //runs once
    helper(start, end);
  }
  if(count !== 0){
    start = count * 100000 + 1;
    end = start + 100000;
    helper(start, end)
  }

  const items = data;
  res.send(items);

})

  // const helper = (start, end) => {
  //   //if count === 1, then itll start on 101,000
  //     console.log(count, "counter");
  //   if(count !== 0){
  //       start = count * 100 +1;
  //       end = start + 9;
  //     }

  //     if(count !== 0 && interval !== 0){
  //       start = start +10;
  //       end = start + 10;
  //     }

  //     console.log(interval, "interval", start, "start", end, "end");
  //     for(i=start; i <= end; i++){
  //         let alt = faker.commerce.productName(); //same as name
  //         let src = faker.image.avatar();  //also name of obj as string ex: "0"{"alt": "name of product"}
  //         let category = faker.commerce.product();
  //         let subCategory = faker.commerce.department();
  //         data[i] = {"alt": alt, "src": src, "id": i, "category": category, "subCategory": subCategory, "name": alt}
  //     }
  //     console.log(interval, "interval");
  //     if(count === 3){
  //       res.send(data);
  //     }
  //     interval ++;
  //     if(interval === 10){
  //       count ++;
  //       helper(10 , 101);
  //     }else{
  //       helper(0, 0)
  //     }
      
  //   console.log("done");
  // }
  
  // if(!done){
  //   helper(1, 10);
  // }






  //   console.log("passed the function with counter at ", count);


  //query database
  
  // if count !== 100
    //then set done = false;
      // and call the heloer function again




// app.post("/users", middleware.itemLookup, async (req, res) => {
//   try {
//     const item = req.body.item;
//     let sessionId = req.cookies.user_session;
//     if (!req.cookies.user_session) {
//       sessionId = helpers.randomStringifiedNumberOfLength(32);
//       await db.createUser(sessionId);
//       res.cookie("user_session", sessionId);
//     }
//     const user = await db.getUser(sessionId);
//     await db.recordView(user.id, item.id);
//     res.status(201);
//   } catch (err) {
//     console.log("duplicate userHist insertion attempted, probably");
//   } finally {
//     res.send();
//   }
// });

// app.get("/carousels", middleware.itemLookup, async (req, res) => {
//   const item = req.body.item;
//   const carousels = {};


//   carousels.related = await db.selectRelated(item);
//   const sameCategory = await db.selectSameCategory(item);
//   const alsoViewedFiller = await db.getAlsoViewedFiller(item.id);
//   carousels.alsoViewed = helpers.concatOnlyUnique(
//     sameCategory,
//     alsoViewedFiller
//   );
//   carousels.prevViewed = await db.getUserHistory(
//     req.cookies.user_session,
//     item.id
//   );

//   res.send(carousels);
// });

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});

module.exports = { app };