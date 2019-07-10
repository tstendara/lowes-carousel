const express = require("express");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("dist"));

// app.get('/*', (req, res) => {
//     res.send('the omniroute hears you');
// });

app.listen(PORT, HOST);
console.log(`what up, i'm on http://${HOST}:${PORT}, baby`);
