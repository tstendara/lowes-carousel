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

app.get('/users', async (req, res) => {
  if (!req.cookies.user_session) {
    let sessionId = ''
    for (let i = 0; i < 8; i++) {
      sessionId += Math.floor(Math.random() * 9).toString()
    }
    await db.createUser(Number(sessionId));
    res.cookie('user_session', Number(sessionId)).send('Cookie is set');
  } else {
    console.log(req.cookies);
    res.send('you already got a cookie my friend');
  }
})

app.get('/carousels/', async (req, res) => {
  const regex = /[\/:. ]+/g;
  const id = req.query.id.replace(regex, '');

  const item = await db.selectOneById(id);
  const carousels = {};

  carousels.related = await db.selectRelated(item[0]);
  carousels.alsoViewed = await db.selectSameCategory(item[0]);
  carousels.prevViewed = [];

  res.send(carousels);
});

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
