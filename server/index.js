// const app = require("./app");
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("../database/index.js"); //changed routing to new index
// const db = require("../database/index.js");
const middleware = require("./middleware.js");
const helpers = require("./helpers.js");
const faker = require("faker");
// const test = require('./dataGenerator.js');
const PORT = 3000;



app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors(middleware.corsOptions));
app.use(express.static("dist"));


app.get("/seedDaDB", (req, res) => {
  
    let data = {};
    for(i=355; i <= 2000; i++){
      let alt = faker.commerce.productName(); //same as name
      let src = faker.image.avatar();  //also name of obj as string ex: "0"{"alt": "name of product"}
      let category = faker.commerce.product();
      let subCategory = faker.commerce.department();
      data[i] = {"alt": alt, "src": src, "id": i, "category": category, "subCategory": subCategory, "name": alt}
    }


    db.SeedDb(data, (err, suc) => {
      if(err) {
        console.error("ERR server", err);
      }else{
        res.status(200).send("SUCC")
      }
    })
    //query
})


app.post("/users", middleware.itemLookup, async (req, res) => {
  
    const item = req.body.item;
    // console.log(item, "SERVER /users");
    let sessionId = req.cookies.user_session;
    // console.log(sessionId, "sessionid");
    if (!req.cookies.user_session) { // for testing
      sessionId = helpers.randomStringifiedNumberOfLength(32);
      await db.createUser(sessionId, (err, suc) => {
        if(err){
          throw err;
        }else{
          // console.log(suc, "GOT ITTTTT");
          return suc;
        }
      });
      res.cookie("user_session", sessionId);
    }
    // console.log("Right before getUser");
    let user;

    db.getUser(sessionId, (err, suc) => {
      if(err){
        throw err;
      }else{
        // console.log(suc[0], "getUser");
        // console.log(suc, "loadbrglkjqnerobnqelrnbqebrqerbbwrtn@@@@@");
        user = suc[0];
        // console.log(user.id, item.id, "item.id, and user.id");
        db.recordView(user.id, item.id, (err, suc) => {
          if(err){
            console.log(err, "DIDNT RECORD" );
          }else{
            return suc;
            
          }
        });
      }
    })

    res.end();
});

app.get("/carousels", middleware.itemLookup, async (req, res) => {
  const item = req.body.item;
  const carousels = {};
  done = false;
  let count = 0;
  
   await db.selectRelated(item, (err, suc) => {
    if(err){
      console.log("/carosels bug", err);
    }else{
      // console.log("CAROUSSEL RELATED", suc);
      carousels.related = suc;
      // console.log(carousels.related, "CARSRELATEDDDDDD");
      db.selectSameCategory(item, (err, suc) => {
        if(err){
          console.log("err", "CAROUSEELCAMECATEFORY");
        }else{
          // console.log(suc, "SAMECATEGORY");
          const sameCategory = suc;
          // console.log(item.id, "ITEMIDDDDDDD");
          db.getAlsoViewedFiller(item.id, (err, suc) => {
            if(err){
              console.log(err, "also viewevedfiller" );
            }else{
              // console.log(suc, "alsoViewevFiller");
              // console.log(sameCategory, "CAROUSELRELATED");
              const alsoViewedFiller = suc;
              console.log("viewed\n", alsoViewedFiller,  "\ncategory\n", sameCategory[0], "\nRELATED\n", carousels.related);
              let results = helpers.concatOnlyUnique(sameCategory, alsoViewedFiller) ;
              carousels.alsoViewed = results;

              console.log(carousels.alsoViewed, "abfsgqehrlgkn");
                  // console.log(carousels.alsoViewed);
             db.getUserHistory(req.cookies.user_session, item.id, (err, results) => {
               if(err){
                console.log(err);
               }else{
                carousels.prevViewed = results;
                res.send(carousels);
               }
             });

             
            
              }
             
            })
          }
          
        });
        }
      });
});
  
  

  

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});

