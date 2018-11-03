const express = require("express");
var bodyParser = require("body-parser"); //so we can do console.log(req.body) in POST
const fs = require("fs");
const sqlite = require("sql.js");
const path = require('path');


const filebuffer = fs.readFileSync("db/usda-nnd.sqlite3");
const db = new sqlite.Database(filebuffer);

const { Client } = require('pg');
var connURL = process.env.DATBASE_URL;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

//Express only serves static assets in production
//Since procoess.env.DATABASE_URL isn't usage in dev, 
//we use the static connetion string to connect to the DB if not on production
if (process.env.NODE_ENV === "production") {
  //app.use(express.static("client/build"));
  console.log("In Production");
}else {
  console.log("In Development"); 
  connURL = fs.readFileSync("pg-cred.txt", "utf8");
}

//Initialize client and connect to Heroku DB
const client = new Client({
   connectionString: connURL,
   ssl: true
});

client.connect();

const COLUMNS = [
  "carbohydrate_g",
  "protein_g",
  "fa_sat_g",
  "fa_mono_g",
  "fa_poly_g",
  "kcal",
  "description"
];

const queryGetUser = "SELECT * FROM users WHERE user_id = $1";
const queryInsertUser = "INSERT INTO users VALUES ($1) RETURNING *";
const queryUpdateUserProfile = `UPDATE users 
                                SET first_name = $2, last_name = $3 
                                WHERE user_id = $1 RETURNING *`;
const queryInsertEntry = "";
const queryUpdateEntry = "";
const queryDeleteEntry = "";

/* Returns the user's information if exists */
app.post('/api/user/exists', async (req, res) => {
  const values = [req.body.userId];
  try {
    const result = await client.query(queryGetUser, values);

    let ret = {users: []};

    if (result.rows[0]) {
      let users = [];
      result.rows.map(row => {
        users.push(row);
      });
      ret.users = users;
    }
    res.json(ret);
  }catch(err) {
    console.log(err);
    res.send(err);
  }
});

app.post('/api/user/insert', async (req, res) => {
  const values = [req.body.userId];
  try {
    const result = await client.query(queryInsertUser, values);
    res.json({users: result.rows, count: result.rows.length});
  }catch(err) {
    res.json(500, err);
  }
});

/* Updates the user with new values and returns the updated user and the count(should be 1) */
app.post('/api/user/update', async (req, res) => {
  
  try {
    const body = req.body;
    const values = [body.userId, body.firstName, body.lastName];
    
    const result = await client.query(queryUpdateUserProfile, values);

    let ret = {users: [], count: 0};

    if (result.rows[0]) {
      let users = [];
      result.rows.map(row => {
        users.push(row);
      });
      ret.users = users;
      ret.count = users.length;
      res.json(ret);
    }else {
      res.send(401);
    }
  }catch(err) {
    console.log(err);
    res.send(400, err);
  }
});

/* Returns all users from the "users" table */
app.get('/api/user/getAll', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    
    let ret = {users: [], count: 0};

    if (result.rows[0]) {
      let users = [];
      result.rows.map(row => {
        users.push(row);
      });
      ret.users = users;
      ret.count = users.length;
    }
    res.json(ret);
  } catch (err) {
    console.error(err);
    res.send(400, err);
  }
}); 

app.get("/api/food", (req, res) => {
  
  const param = req.query.q;

  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(
    `
    select ${COLUMNS.join(", ")} from entries
    where description like '%${param}%'
    limit 100
  `
  );

  console.log(r[0]);

  if (r[0]) {
    res.json(
      r[0].values.map(entry => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          console.log("\\\\");
          console.log("c: "+c);
          console.log("idx: "+idx);
          console.log("\\\\");
          // combine fat columns
          if (c.match(/^fa_/)) {
            e.fat_g = e.fat_g || 0.0;
            e.fat_g = (parseFloat(e.fat_g, 10) +
              parseFloat(entry[idx], 10)).toFixed(2);
          } else {
            e[c] = entry[idx];
          }
        });
        console.log("------------");
        console.log(e);
        return e;
      })
    );
  } else {
    res.json([]);
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
