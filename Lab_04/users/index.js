const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library",
});
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  const checkEmailSql = "select * from users where email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Error checking email" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const insertUserSql = "insert into users values ('', ?, ?)";

    db.query(insertUserSql, [email, password], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ error: "Error inserting user" });
      }

      res.status(201).json({ userID: result.insertId });
    });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const checkEmailSql = "select * from users where email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Error checking email" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = results[0];

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({
      userID: user.userID,
    });
  });
});
