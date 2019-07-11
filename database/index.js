const { Pool, Client } = require("pg");
const CONFIG = require("../config/db.config.json");
const scrapedJSON = require("../scrapedData/scrapings.json");

const pool = new Pool({
  host: CONFIG.host,
  user: CONFIG.user,
  database: CONFIG.database,
  password: CONFIG.password,
  port: CONFIG.port
});

const selectAll = async () => {
  try{
    const { rows } = await pool.query(`SELECT * FROM images;`)
    console.log(rows);
  } catch (err) {
    console.log(err);
  }
};

// pool
//   .query("SELECT * FROM images")
//   .then(res => console.log(`user: ${res.rows[0].src}`))
//   .catch(err =>
//     setImmediate(() => {
//       throw err;
//     })
//   );

const insertScrapings = async (scrapings) => {
  try {
    for (let i = 1; i < 101; i++) {
      const key = i.toString();
      const current = scrapings[key];
      console.log(current);
      await pool
        .query(`INSERT INTO images (name, src, category, subCategory) 
        VALUES ('${current.name}', '${current.src}', '${current.category}', '${current.subCategory}');`)
    }
  }
  catch (err) {
    console.log(err);
  }
}



selectAll();


