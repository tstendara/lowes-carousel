const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('dist'));

app.get('/*', (req, res) => {
    res.send('the omniroute hears you');
});

app.listen(3000, () => {console.log('what up i\'m on')});