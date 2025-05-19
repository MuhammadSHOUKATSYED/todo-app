const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all todos
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id');
  res.json(result.rows);
});

// Create a todo
router.post('/', async (req, res) => {
  const { task } = req.body;
  const result = await pool.query(
    'INSERT INTO todos (task) VALUES ($1) RETURNING *',
    [task]
  );
  res.json(result.rows[0]);
});

// Toggle completed
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(result.rows[0]);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;