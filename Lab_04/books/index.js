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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

app.get("/api/books", (req, res) => {
  var sql = "select * from books";
  db.query(sql, (err, result) => {
    if (result) {
      res.send(JSON.stringify(result));
      return;
    }
    var error = {
      error: "error occured",
    };
    res.send(JSON.stringify(error));
  });
});

app.get("/api/books/:id", (req, res) => {
  var id = req.params.id;
  var sql = "select * from books where bookID = " + id;

  db.query(sql, (err, result) => {
    var error;
    if (result) {
      if (result.length > 0) {
        res.send(JSON.stringify(result));
        return;
      }
      error = {
        error: "book of id: " + id + " not found",
      };
    } else {
      error = {
        error: "error occured",
      };
    }
    res.send(JSON.stringify(error));
    return;
  });
});

app.post("/api/books", (req, res) => {
  const { title, author, year } = req.body;
  var sql = "insert into books values ('',?,?,?)";

  db.query(sql, [title, author, year], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Error occurred" });
      return;
    }
    res.status(201).send({ id: result.insertId });
  });
});

app.delete("/api/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from books where bookID = ?";

  db.query(sql, (err, result) => {
    if (err) {
      res
        .status(500)
        .send(
          JSON.stringify({ error: "Error occurred while deleting the book" })
        );
      return;
    }
    if (result.affectedRows > 0) {
      res.send(
        JSON.stringify({ message: `Book with ID ${id} deleted successfully` })
      );
    }
    res
      .status(404)
      .send(JSON.stringify({ error: `Book with ID ${id} not found` }));
  });
});
