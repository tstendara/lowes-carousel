const express = require("express");
const cookieParser = require('cookie-parser');
const db = require("../database/index.js");
const helpers = require("./helpers.js");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("dist"));

app.use(async (req, res, next) => {
  const id = req.query.id.replace(/[\/:. ]+/g, '');
  req.body.item = await db.selectOneById(id);
  next();
});

app.get('/users', async (req, res) => {
  if (!req.cookies.user_session) {
    const sessionId = helpers.randomStringifiedNumberOfLength(8);
    const user = await db.createUser(Number(sessionId));
    console.log('the new user info is: ', user);
    res.cookie('user_session', Number(sessionId)).send('Cookie is set');
  } else {
    const item = req.body.item;
    const user = await db.getUser(req.cookies.user_session);
    const viewedItem = await db.recordView(user.id, item.id);
    console.log('user is: ', user, 'viewed is: ', viewedItem)
    res.send(viewedItem);
  }
});

app.get('/carousels', async (req, res) => {
  const item = req.body.item;
  const carousels = {};

  carousels.related = await db.selectRelated(item);
  carousels.alsoViewed = await db.selectSameCategory(item);
  carousels.prevViewed = [];

  res.send(carousels);
});

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
