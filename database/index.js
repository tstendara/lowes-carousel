const { Pool } = require("pg");
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
    const { rows } = await pool.query(`SELECT * FROM images;`);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const selectOneById = async (itemId) => {
  const qText = `SELECT * FROM images WHERE id = $1`;
  const qValues = [itemId];

  try {
    const { rows } = await pool.query(qText, qValues);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const selectOneByName = async itemName => {
  const qText = `SELECT * FROM images WHERE name = $1`;
  const qValues = [itemName];

  try {
    const { rows } = await pool.query(qText, qValues);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const selectRelated = async item => {
  const qText = `SELECT id, name, src, alt FROM images WHERE name != $1 AND category = $2 AND subCategory != $3`;
  const qValues = [item.name, item.category, item.subCategory];

  try {
    const { rows } = await pool.query(qText, qValues);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const selectSameCategory = async item => {
  const qText = `SELECT id, name, src, alt FROM images WHERE name != $1 AND subCategory = $2`;
  const qValues = [item.name, item.subCategory];

  try {
    const { rows } = await pool.query(qText, qValues);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const insertScrapings = async scrapings => {
  const qText = `INSERT INTO images (name, src, alt, category, subCategory) VALUES ($1, $2, $3, $4, $5);`;

  try {
    for (let i = 1; i < 101; i++) {
      const key = i.toString();
      const current = scrapings[key];
      const qValues = [
        current.name,
        current.src,
        current.alt,
        current.category,
        current.subCategory
      ];
      await pool.query(qText, qValues);
      console.log(current);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  selectOneById,
  selectOneByName,
  selectRelated,
  selectSameCategory
};

// node-based testing below

// selectRelated(scrapedJSON["7"])
//   .catch(err => {
//     console.log(err);
//   });
