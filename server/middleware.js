const db = require("../database/index.js");

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

  module.exports = { itemLookup, corsOptions };