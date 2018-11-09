const express = require("express");
var bodyParser = require("body-parser"); //so we can do console.log(req.body) in POST
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

var connURL = process.env.DATBASE_URL;

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

//Express only serves static assets in production
//Since procoess.env.DATABASE_URL isn't usage in dev,
//We use the static connetion string to connect to the DB if not on production
if (process.env.NODE_ENV === "production") {
  console.log("In Production");
} else {
  console.log("In Development");
  connURL = fs.readFileSync("pg-cred.txt", "utf8");
}

//Initialize client and connect to Heroku DB
const client = new Client({
  connectionString: connURL,
  ssl: true
});

client.connect();

const queryGetUser = "SELECT * FROM users WHERE user_id = $1";

const queryInsertUser = "INSERT INTO users VALUES ($1) RETURNING *";

const queryUpdateUserProfile = `UPDATE users 
                                SET first_name = $2, last_name = $3 
                                WHERE user_id = $1 RETURNING *`;

const queryInsertEntry = `INSERT INTO lists 
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

const queryUpdateEntry = `UPDATE lists
                          SET company_name = $4, job_title = $5, website = $6, area = $7,
                              apply_method = $8, apply_date = $9, got_response = $10,
                              app_status = $11, interview_date = $12, notes = $13
                          WHERE user_id = $1 AND company_name = $2 AND job_title = $3 RETURNING *`;

const queryDeleteEntry = `DELETE FROM lists 
                          WHERE user_id = $1 AND company_name = $2 AND job_title = $3 RETURNING *`;

const queryGetAllEntries = "SELECT * FROM users WHERE user_id = $1";

/* Returns the user's information if exists */
app.post("/api/user/exists", async (req, res) => {
  const values = [req.body.userId];
  try {
    const result = await client.query(queryGetUser, values);

    let ret = { users: [] };

    if (result.rows[0]) {
      let users = [];
      result.rows.map(row => {
        users.push(row);
      });
      ret.users = users;
    }
    res.json(ret);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/api/user/insert", async (req, res) => {
  const values = [req.body.userId];
  console.log(values);
  try {
    const result = await client.query(queryInsertUser, values);
    res.json({ users: result.rows, count: result.rows.length });
  } catch (err) {
    res.json(500, err);
  }
});

/* Updates the user with new values and returns the updated user and the count(should be 1) */
app.post("/api/user/update", async (req, res) => {
  try {
    const body = req.body;
    const values = [body.userId, body.firstName, body.lastName];

    const result = await client.query(queryUpdateUserProfile, values);

    let ret = { users: [], count: 0 };

    if (result.rows[0]) {
      let users = [];
      result.rows.map(row => {
        users.push(row);
      });
      ret.users = users;
      ret.count = users.length;
      res.json(ret);
    } else {
      res.send(401);
    }
  } catch (err) {
    console.log(err);
    res.send(400, err);
  }
});

/* Returns all users from the "users" table */
app.get("/api/user/getAll", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users");

    let ret = { users: [], count: 0 };

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

/* Inserts a entry into the user's list in the DB */
app.post("/api/user/entry/insert", async (req, res) => {
  let body = req.body;
  let values = [
    body.userId,
    body.entry.companyName,
    body.entry.jobTitle,
    body.entry.website,
    body.entry.area,
    body.entry.applyMethod,
    body.entry.applyDate,
    body.entry.gotResponse,
    body.entry.appStatus,
    body.entry.interviewDate,
    body.entry.notes
  ];

  try {
    const result = await client.query(queryInsertEntry, values);

    let ret = { users: [], count: 0 };

    if (result.rows[0]) {
      let users = [];
      result.rows.map(row => {
        users.push(row);
      });
      ret.users = users;
      ret.count = users.length;
      res.json(ret);
    } else {
      res.send(401);
    }
  } catch (err) {
    console.error(err);
    res.send(400);
  }
});

/* Updates a user's entry in the DB */
app.post("/api/user/entry/update", async (req, res) => {
  let body = req.body;
  let values = [
    body.userId,
    body.oldEntry.companyName,
    body.oldEntry.jobTitle,
    body.entry.companyName,
    body.entry.jobTitle,
    body.entry.website,
    body.entry.area,
    body.entry.applyMethod,
    body.entry.applyDate,
    body.entry.gotResponse,
    body.entry.appStatus,
    body.entry.interviewDate,
    body.entry.notes
  ];

  try {
    const result = await client.query(queryUpdateEntry, values);

    let ret = { users: [], count: 0 };

    if (result.rows[0]) {
      let users = [];
      result.rows.map(row => {
        users.push(row);
      });
      ret.users = users;
      ret.count = users.length;
      res.json(ret);
    } else {
      res.send(401);
    }
  } catch (err) {
    console.error(err);
    res.send(400);
  }
});

/* Deletes an entry from a user's list in the DB. */
app.post("/api/user/entry/delete", async (req, res) => {
  let values = [req.body.userId, req.body.entry.companyName, req.body.entry.jobTitle];

  try {
    const result = await client.query(queryDeleteEntry, values);

    let ret = { users: [], count: 0 };

    if (result.rows[0]) {
      let users = [];
      result.rows.map(row => {
        users.push(row);
      });
      ret.users = users;
      ret.count = users.length;
      res.json(ret);
    } else {
      res.send(401);
    }
  } catch (err) {
    console.error(err);
    res.send(400);
  }
});

app.post("/api/user/entry/getAll", async (req, res) => {
  let values = [req.body.userId];

  try {
    const result = await client.query(queryGetAllEntries, values);

    let ret = { entries: [], count: 0 };

    if (result.rows[0]) {
      let entries = [];
      result.rows.map(row => {
        entries.push(row);
      });
      ret.entries = entries;
      ret.count = entries.count;
    }
    res.json(ret);
  } catch (err) {
    console.err(err);
    res.send(401);
  }
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
