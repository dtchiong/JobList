const express = require("express");
const fs = require("fs");
const sqlite = require("sql.js");

const filebuffer = fs.readFileSync("db/usda-nnd.sqlite3");

const db = new sqlite.Database(filebuffer);

const { Client } = require('pg');

var connURL = process.env.DATBASE_URL;

const app = express();

app.set("port", process.env.PORT || 3001);

//Express only serves static assets in production
//Since procoess.env.DATABASE_URL isn't usage in dev, 
//we use the static connetion string to connect to the DB if not on production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  console.log("In Production");
}else { 
  connURL = fs.readFileSync("pg-cred.txt", "utf8");
}
/*
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/*', (req, res) => {

  console.log('hi from app.get')
  console.log(req)
  console.log(res)
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
*/
//Initialize client and connect to Heroku DB
const client = new Client({
   connectionString: connURL,
   ssl: true
});

client.connect();
/*
client.query('SELECT * FROM users;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*/
const COLUMNS = [
  "carbohydrate_g",
  "protein_g",
  "fa_sat_g",
  "fa_mono_g",
  "fa_poly_g",
  "kcal",
  "description"
];

app.get('/api/user/new', async (req, res) => {
  console.log("inside server: ");
  return "4Head";
});

app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    const jsonRes = JSON.stringify(result, null, 4);
    console.log(jsonRes);
    
    //const rows = { "results": (result) ? result.rows : null};
    const rows = (result)? result.rows : null;
    console.log(rows);
    //console.log(jsonRes.rows);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}); 

app.get("/api/food", (req, res) => { //request, response?
  
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

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
