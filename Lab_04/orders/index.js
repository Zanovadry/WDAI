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

app.get("/api/orders/:userID", (req, res) => {
  const userID = req.params.userID;
  const sql = "select * from orders where userID = ?";

  db.query(sql, [userID], (err, results) => {
    if (err) {
      console.error(sql);
      console.error("Error retrieving orders:", err);
      return res.status(500).json({ error: "Error retrieving orders" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: `No orders found for userID: ${userID}` });
    }
    res.status(200).json(results);
  });
});

app.post("/api/orders", (req, res) => {
  const { book_id: bookID, quantity } = req.body;
  const checkBookSql = "select * from books where bookID = ?";

  db.query(checkBookSql, [bookID], (err, results) => {
    if (err) {
      console.error("Error checking book:", err);
      return res.status(500).json({ error: "Error checking book existence" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: `Book with ID ${bookID} not found` });
    }

    const insertOrderSql = "insert into orders values ('',1,?,?)";
    db.query(insertOrderSql, [bookID, quantity], (err, result) => {
      if (err) {
        console.error("Error adding order:", err);
        return res.status(500).json({ error: "Error adding order" });
      }

      res.status(201).json({ order_id: result.insertId });
    });
  });
});

app.delete("/api/orders/:orderID", (req, res) => {
  const orderID = req.params.orderID;

  const checkOrderSql = "select * from orders where orderID = ?";

  db.query(checkOrderSql, [orderID], (err, results) => {
    if (err) {
      console.error("Error checking order:", err);
      return res.status(500).json({ error: "Error checking order existence" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: `OrderID ${orderID} not found` });
    }

    const deleteOrderSql = "delete from orders where orderID = ?";

    db.query(deleteOrderSql, [orderID], (err, result) => {
      if (err) {
        console.error("Error deleting order:", err);
        return res.status(500).json({ error: "Error deleting order" });
      }

      res
        .status(200)
        .json({ message: `Order with ID ${orderID} successfully deleted` });
    });
  });
});

app.patch("/api/orders/:orderID", (req, res) => {
  const orderID = req.params.orderID;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ error: "Quantity is required for update" });
  }
  const checkOrderSql = "select * from orders where orderID = ?";

  db.query(checkOrderSql, [orderID], (err, results) => {
    if (err) {
      console.error("Error checking order:", err);
      return res.status(500).json({ error: "Error checking order existence" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: `OrderID ${orderID} not found` });
    }

    const updateOrderSql = "update orders set quantity = ? where orderID = ?";

    db.query(updateOrderSql, [quantity, orderID], (err, result) => {
      if (err) {
        console.error("Error updating order:", err);
        return res.status(500).json({ error: "Error updating order" });
      }

      res
        .status(200)
        .json({ message: `Order ${orderID} quantity set to: ${quantity}` });
    });
  });
});
