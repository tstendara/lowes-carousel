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

const itemLookup = async (req, res, next) => {
  console.log('query is: ', req.body, 'method is: ', req.method);
  let id;
  if (req.method === 'POST') {
    id = req.body.itemId.toString().replace(/[\/:. ]+/g, '');
  } else if (req.method === 'GET') {
    id = req.query.id.replace(/[\/:. ]+/g, '');
  }
  req.body.item = await db.selectOneById(id);
  next();
};

app.post('/users', itemLookup, async (req, res) => {
  console.log('users POST route says: ', req.body);
  const item = req.body.item;
  if (!req.cookies.user_session) {
    const sessionId = helpers.randomStringifiedNumberOfLength(8);
    await db.createUser(Number(sessionId));
    const user = await db.getUser(sessionId);
    await db.recordView(user.id, item.id);    
    res.cookie('user_session', Number(sessionId)).status(201).send();
  } else {
    const user = await db.getUser(req.cookies.user_session);
    await db.recordView(user.id, item.id);
    res.status(201).send();
  }
});

app.get('/carousels', itemLookup, async (req, res) => {
  console.log('users GET route says: ', req.query);
  const item = req.body.item;
  const carousels = {};

  carousels.related = await db.selectRelated(item);
  carousels.alsoViewed = await db.selectSameCategory(item);
  carousels.prevViewed = await db.getUserHistory(req.cookies.user_session);

  res.send(carousels);
});

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
