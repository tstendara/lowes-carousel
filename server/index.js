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
  const item = req.body.item;
  let user;
  try {
    user = await db.getUser(req.cookies.user_session);
  } catch {
    const sessionId = helpers.randomStringifiedNumberOfLength(8);
    await db.createUser(sessionId);
    user = await db.getUser(sessionId);
    res.cookie("user_session", Number(sessionId));
  } finally {
    try {
      await db.recordView(user.id, item.id);
    } catch {
      console.log("dupe caught");
    } finally {
      res.status(201).send();
    }
  }
});

app.get("/carousels", middleware.itemLookup, async (req, res) => {
  const item = req.body.item;
  const carousels = {};

  carousels.related = await db.selectRelated(item);
  const sameCategory = await db.selectSameCategory(item);
  const alsoViewedFiller = await db.getAlsoViewedFiller();
  carousels.alsoViewed = sameCategory.concat(alsoViewedFiller);
  carousels.prevViewed = await db.getUserHistory(req.cookies.user_session);
  console.log(carousels);

  res.send(carousels);
});

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
