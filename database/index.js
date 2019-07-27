const mysql = require('mysql');

const CONFIG = require("../config/db2.Config.json");

const con = mysql.createConnection({
    host: CONFIG.host,
    user: CONFIG.user,
    password: CONFIG.password,
    database: CONFIG.database
})

con.connect(function(err) {
    if(err) throw err;
    // console.log("connected to da Db BB");
})

const SeedDb = (data) => {
    con.query(`input()`);
}

const insert = (data, cb) => {
    console.log(data);
    con.query(`insert into items (prim, id, name) values(null, ${data.number}, "${data.item}")`, (err, res) => {
        if(err) cb("ERR"); 
        else{
            cb(null);
        }
    })
}

const selectOneById = (item, cb) => {
    console.log(item);
    con.query(`Select name from items where name="${item}"`, (err, suc) => {
        if(err) cb(undefined);
        cb(null, suc);
       
    });
}

module.exports = { SeedDb, selectOneById, insert };



