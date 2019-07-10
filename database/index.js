const { Pool, Client } = require("pg");
const CONFIG = require("../config/db.config.json");

const pool = new Pool({
  host: CONFIG.host,
  user: CONFIG.user,
  database: CONFIG.database,
  password: CONFIG.password,
  port: CONFIG.port
});

pool
  .query("SELECT * FROM images")
  .then(res => console.log(`user: ${res.rows[0].src}`))
  .catch(err =>
    setImmediate(() => {
      throw err;
    })
  );

// const client = new Client({
//   user: "psjwwzus",
//   host: "raja.db.elephantsql.com",
//   database: "psjwwzus",
//   password: "qbTuaeQ-qqChIyyP27u1dg5GI2oLs4Bv",
//   port: 5432
// });

// client.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   client.end();
// });
