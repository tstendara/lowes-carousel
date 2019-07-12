const express = require("express");
const db = require("../database/index.js");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("dist"));

// app.get('/*', (req, res) => {
//     res.send('the omniroute hears you');
// });

app.get('/carousels', async (req, res) => {
  try {
    const id = req.body.id;
    const carousels = {};

    db.selectOneById(id)
      .then((selectedOne) => {
        current = selectedOne[0];
      })
      .then(() => {
        const related = db.selectRelated(current)
        const alsoViewed = db.selectSameCategory(current)
        Promise.all([related, alsoViewed]).then((returns) => {
          console.log(returns);
        })
      })
      .then(() => {
        res.send(carousels);
      })
  } catch (err) {
    console.log(err);
  } 
});

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
