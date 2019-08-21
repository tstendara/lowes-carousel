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

const SeedDb = (data, cb) => {
    // console.log(data);

    for(item in data){
        console.log(data[item]);
        const qValues = [item, data[item].name, data[item].src, data[item].alt, data[item].category, data[item].subCategory];
        const qText = `insert into images (id, name, src, alt, category, subcategory)
                        values(${qValues[0]}, "${qValues[1]}", "${qValues[2]}", "${qValues[3]}", "${qValues[4]}", "${qValues[5]}")`;
        con.query(qText, (err, res) => {
            if(err){ console.log("err", err);}
        })
    }
    cb(null, "SUCC");
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


const del = (item, cb) => {
    con.query(`delete from items where name="${item}" `, (err, suc) => {
        if(err) cb("ERR");
        else{
            cb(null);
        }
    })
} 

const selectOneByName = (itemName, cb) => {
    const qValues = [itemName]
    const qText = `Select name from items where name="${qValues[0]}";`
    con.query(qText, (err, res) => {
        if(err) cb("err");
        else{
            const { rows } = res;
            cb(null, rows[0]);
        }
    });
}

selectOneById = (itemId, cb) => {
    // console.log(itemId, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    const qValues = [itemId];
    const qText = `select * from images where id=${qValues[0]}`;

    con.query(qText, (err, res) => {
        if(err){
            cb("err");
        }else{
            // console.log(res);
            cb(null, res);
        }
    })
}

const selectRelated = (item, cb) => { 
    const qValues = [item.name, item.category, item.subcategory];
    const qText = `select id, name, src, alt from images where name !="${qValues[0]}" and category="${qValues[1]}" and subCategory !="${qValues[2]}"`;

    con.query(qText, (err, res) => {
        if(err){
            cb("err");
        }else{
           
            cb(null, res);
        }
    })
}

const createUser = (userSesh, cb) => {
    const qValues = [userSesh];
    const qText = `insert into users (session) values (${qValues[0]})`;

    con.query(qText, (err, suc) => {
        if(err){
            cb("ERR");
        }else{
            cb(null, res);
        }
    })
}

const getAlsoViewedFiller = (itemId, cb) => {
    const qValues = [itemId];
    // console.log(qValues);
    const qText = `SELECT images.id, images.name, images.src, images.alt FROM images, userhistory, users  
    WHERE images.id = userhistory.imageId AND images.id !=${qValues[0]} AND users.id = userhistory.userId limit 15;`;
   
    con.query(qText, (err, res) => {
        if(err){
            cb("ERR");
        }else{
            // console.log(res);
            cb(null, res);
        }
    })
}

const selectSameCategory = (item, cb) => {
    const qValues = [item.name, item.subcategory]
    const qText = `SELECT id, name, src, alt FROM images WHERE name !="${qValues[0]}" AND subCategory ="${qValues[1]}"`;
    con.query(qText, (err, res) => {
        if(err) cb("err");
        else{
            // console.log(res, "DB slectSameCategory");
            const { rows } = res;
            cb(null, res); //would bring back all items that have this category
        }
    })
}

const getUser = (userSesh, cb) => {
    // console.log(userSesh, "IN DBBBBBBBBB");
    const qValues = [userSesh];
    const qText = `select * from users where session =${qValues[0]}`;

    con.query(qText, (err, res) => {
        if(err){
            cb("ERR");
        }else{
            console.log(res[0]);
            cb(null, res);
        }
    })
}

const getUserHistory = (userSesh, itemId, cb) => {
    const qValues = [userSesh, itemId];
    const qText = `SELECT images.id, images.name, images.src, images.alt FROM images, userhistory, users 
    WHERE images.id = userhistory.imageId AND users.id = userhistory.userId AND users.session =${qValues[0]} AND images.id !=${qValues[1]}
    ORDER BY userhistory.id DESC;`;

    con.query(qText, (err, res) => {
        if(err){
            cb(err);
        }else{
            let result = res;
            cb(null, result);
        }
    })
}

const recordView = (userId, itemId, cb) => {
    const qValues = [userId, itemId]; 
    const qText = `INSERT INTO userhistory (userId, imageId) values(${qValues[0]}, ${qValues[1]})`;

    con.query(qText, (err, res) => {
        if(err){
            cb(err);
        }else{
            cb(null, "SUC");
        }
    })
}

module.exports = {
    selectOneById, //
    selectOneByName, //
    selectRelated, // donzo
    selectSameCategory, //donzo
    getAlsoViewedFiller,//donzo
    createUser,//donzo
    getUser, // donzo
    getUserHistory, //  may have problems with the fact that im not returning it as a prop of an object
    recordView, // donzo
    SeedDb
  };

