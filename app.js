const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'testdb'
});

db.connect((err) => {
  if (err) {
    console.log("Waiting for MySQL...");
    setTimeout(() => db.connect(), 5000);
  } else {
    console.log("Connected to MySQL");
  }
});

app.post('/add', (req, res) => {
  const { id, name } = req.body;
  db.query('INSERT INTO users (id, name) VALUES (?, ?)', [id, name], (err) => {
    if (err) return res.send(err);
    res.send("User added");
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
