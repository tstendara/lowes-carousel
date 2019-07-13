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
    const id = req.body.id;
    const carousels = {};
    const item = await db.selectOneById(id);
    
    carousels.related = await db.selectRelated(item[0]);
    carousels.alsoViewed = await db.selectSameCategory(item[0]);

    res.send(carousels);
});

app.listen(PORT, () => {
  console.log(`what up, i'm on ${PORT}, baby`);
});
