const db = require("../database/index.js");

const itemLookup = async (req, res, next) => {
    let id;
    let regex = /[\/:. ]+/g;
    if (req.method === 'POST') {
      id = req.body.itemId.replace(regex, '');
    } else if (req.method === 'GET') {
      id = req.query.id.replace(regex, '');
    }
    req.body.item = await db.selectOneById(id);
    next();
  };

  module.exports = { itemLookup };