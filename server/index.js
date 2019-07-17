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

const whitelist = [
  "http://fec-proxy.us-east-1.elasticbeanstalk.com/",
  "http://lowesproxy-env.6tim4uzsty.us-east-2.elasticbeanstalk.com/",
  "http://localhost:3000",
  "http://fec-lowes-carousel.us-east-2.elasticbeanstalk.com/",
  "http://ec2-18-188-213-241.us-east-2.compute.amazonaws.com",
  "http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com"
];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.static("dist"));

app.post("/users", middleware.itemLookup, async (req, res) => {
  const item = req.body.item;
  if (!req.cookies.user_session) {
    const sessionId = helpers.randomStringifiedNumberOfLength(8);
    await db.createUser(Number(sessionId));
    const user = await db.getUser(sessionId);
    await db.recordView(user.id, item.id);
    res
      .cookie("user_session", Number(sessionId))
      .status(201)
      .send();
  } else {
    const user = await db.getUser(req.cookies.user_session);
    await db.recordView(user.id, item.id);
    res.status(201).send();
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
