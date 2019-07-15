const express = require("express");
const cookieParser = require('cookie-parser');
const db = require("../database/index.js");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("dist"));

// app.get('/*', (req, res) => {
//     res.send('the omniroute hears you');
// });

app.use(async (req, res, next) => {
  const id = req.query.id.replace(/[\/:. ]+/g, '');
  req.body.itemId = await db.selectOneById(id);
  console.log(req.query.id)
  next();
});

app.get('/users', async (req, res) => {
  if (!req.cookies.user_session) {
    let sessionId = '';
    for (let i = 0; i < 8; i++) {
      sessionId += Math.floor(Math.random() * 9).toString();
    }
    await db.createUser(Number(sessionId));
    res.cookie('user_session', Number(sessionId)).send('Cookie is set');
  } else {
    console.log(req.cookies);
    // const user = await db.getUser(req.cookies.user_session);
    // const item = await db.selectOneById(id);
    // const view = db.recordView(user.id, item.id);
    res.send('you already got a cookie my friend');
  }
});

app.get('/carousels/', async (req, res) => {
  const item = req.body.item[0];
  const carousels = {};

  carousels.related = await db.selectRelated(item);
  carousels.alsoViewed = await db.selectSameCategory(item);
  carousels.prevViewed = [];

  res.send(carousels);
});

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
