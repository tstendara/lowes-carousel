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
  try {
    const { rows } = await pool.query(`SELECT * FROM images;`)
    console.log(rows);
  } catch (err) {
    console.log(err);
  }
};

const selectRelatedItems = async () => {
  try {
    const { items } = await pool.query(`SELECT `)
    console.log(items);
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
      const qText = `INSERT INTO images (name, src, alt, category, subCategory) VALUES ($1, $2, $3, $4, $5);`;
      const qValues = [current.name, current.src, current.alt, current.category, current.subCategory];
      await pool.query(qText, qValues)
      console.log(current);
    }
  }
  catch (err) {
    console.log(err);
  }
}

// selectAll();

insertScrapings(scrapedJSON)
  .catch((err) => {
    console.log(err);
  });

