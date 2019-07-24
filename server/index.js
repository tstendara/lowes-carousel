const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("../database/index.js"); //changed routing to new index
const middleware = require("./middleware.js");
const helpers = require("./helpers.js");
const faker = require("faker");
// const test = require('./dataGenerator.js');
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors(middleware.corsOptions));

app.use(express.static("dist"));

app.get("/test", (req, res) => {
  
  const data = {};
  let done = false;
  let count = 0; //need to stop after 100
  let interval = 0; //each time the for loop is going thru 

  
  const helper = () => {
    //if count === 1, then itll start on 101,000
    while (!done){

      let end = interval * 10;
      let start = end - 10;
      if(interval === 0){ // setting up for first run of each interval
        end = 10;
        start = 1
      }
      if(count > 0){
        console.log(count, "counter");
        const index = count * 10; //set each count = 100,000 for a reference on where to start
        start = index;
        end = index + 10;
      }
      console.log(interval, "counter", start, "start", end, "end");
      for(i=start; i <= end; i++){
          let alt = faker.commerce.productName(); //same as name
          let src = faker.image.avatar();  //also name of obj as string ex: "0"{"alt": "name of product"}
          let category = faker.commerce.product();
          let subCategory = faker.commerce.department();
          console.log(interval, "counter");
          data[i] = {"alt": alt, "src": src, "id": i, "category": category, "subCategory": subCategory, "name": alt}
      }
      interval ++;
      if(interval === 10){
        done = true;
      }
    }
  } 

  if(!done){
    helper();
  }

  count ++;
  if(count !== 5){
    done = false;
    interval = 0;
    helper();
    }


  //query database
  
  // if count !== 100
    //then set done = false;
      // and call the heloer function again

  const items = data;
  res.send(items);
})

app.post("/users", middleware.itemLookup, async (req, res) => {
  try {
    const item = req.body.item;
    let sessionId = req.cookies.user_session;
    if (!req.cookies.user_session) {
      sessionId = helpers.randomStringifiedNumberOfLength(32);
      await db.createUser(sessionId);
      res.cookie("user_session", sessionId);
    }
    const user = await db.getUser(sessionId);
    await db.recordView(user.id, item.id);
    res.status(201);
  } catch (err) {
    console.log("duplicate userHist insertion attempted, probably");
  } finally {
    res.send();
  }
});

app.get("/carousels", middleware.itemLookup, async (req, res) => {
  const item = req.body.item;
  const carousels = {};


  carousels.related = await db.selectRelated(item);
  const sameCategory = await db.selectSameCategory(item);
  const alsoViewedFiller = await db.getAlsoViewedFiller(item.id);
  carousels.alsoViewed = helpers.concatOnlyUnique(
    sameCategory,
    alsoViewedFiller
  );
  carousels.prevViewed = await db.getUserHistory(
    req.cookies.user_session,
    item.id
  );

  res.send(carousels);
});

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
