const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("../database/index.js");
const middleware = require("./middleware.js");
const helpers = require("./helpers.js");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors(middleware.corsOptions));

app.use(express.static("dist"));

app.post("/users", middleware.itemLookup, async (req, res) => {
  try {
    const item = req.body.item;
    let sessionId = req.cookies.user_session;
    if (!req.cookies.user_session) {
      sessionId = helpers.randomStringifiedNumberOfLength(8);
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

// app.get("/profiles", async (req, res) => {
//   let username;
//   try {
//     let regex = /[\/:. ]+/g;
//     let profile = req.query.profile.replace(regex, '');
//     username = await db.getProfile(profile);
//   } catch {
//     console.log('profile not exist');
//   } finally {
//     res.send(username);
//   }
// });

// app.post("/profiles", async (req, res) => {
//   try {
//     let regex = /[\/:. ]+/g;
//     let username = req.body.profile.replace(regex, '');
//     await db.createProfile(username);
//   } catch {
//     console.log('could not create profile');
//   } finally {
//     res.status(201).send();
//   }
// });

// app.post("/faves", async (req, res) => {
//   try {
//     let regex = /[\/:. ]+/g;
//     const username = req.body.username.replace(regex, '');
//     const itemId = req.body.itemId;
//     await db.recordFave(username, itemId);
//     res.status(201);
//   } catch {
//     console.log("fave already existed, probably!");
//   } finally {
//     res.send();
//   }
// });

// app.get("/faves", async (req, res) => {
//   let favoritesCarousel;
//   try {
//     let regex = /[\/:. ]+/g;
//     let username = req.query.username.replace(regex, '');
//     const profile = await db.getProfile(username);
//     const faves = await db.getUserFaves(profile);
//     favoritesCarousel = faves || [];
//   } catch {
//     console.log("no faves?");
//   } finally {
//     res.send(favoritesCarousel);
//   }
// });

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

app.get("/faves", async (req, res) => {
  console.log(req.query.id);

  const itemIds = req.query.id.split(' ')
  const faves = [];
  await itemIds.map(async (id) => {
    const item = await db.selectOneById(id);
    faves.push(item);
    console.log(item);
  })
  console.log('item ids: ', itemIds);
  console.log(faves);
  res.send(faves)
})

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
