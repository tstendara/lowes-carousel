const mysql = require('mysql');

const CONFIG = require("../config/db2.config.json");
const scrapedJSON = require("../scrapedData/scrapings.json");

const con = mysql.createConnection.CONFIG();

con.connection(function(err) {
    if(err) throw err;
    console.log("connected");
})

const SeedDb = (data) => {
    
    con.query(`input()`)
}

const selectOneById = (item) => {
    con.query(`Select * from images where id=`)
}



