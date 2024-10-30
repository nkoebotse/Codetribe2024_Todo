const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const dbPath = path.join(__dirname, 'database.sqlite');

// Create a database file named 'database.sqlite'
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Error opening database: " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

app.use(cors());
app.use(bodyParser.json());

// Initialize database
db.serialize(() => {
  // Create tables if they don't exist
  db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT, priority TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)");

  // Sample user for testing (optional)
  db.get("SELECT * FROM users WHERE email = ?", ['elliot@gmail.com'], (err, row) => {
    if (!row) {
      db.run("INSERT INTO users (email, password) VALUES (?, ?)", ['elliot@gmail.com', '12345678']);
    }
  });
});

// Endpoint to register a new user
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  
  // Check if email already exists
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (row) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Insert new user
    db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, email });
    });
  });
});

// Endpoint for user login
app.get('/api/login', (req, res) => {
  const { email, password } = req.query;
  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(row); // Return user data if found
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// Todos endpoints
app.get('/api/todos', (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/api/todos', (req, res) => {
  const { task, priority } = req.body;
  db.run("INSERT INTO todos (task, priority) VALUES (?, ?)", [task, priority], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, task, priority });
  });
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, priority } = req.body;
  db.run("UPDATE todos SET task = ?, priority = ? WHERE id = ?", [task, priority, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, task, priority });
  });
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
