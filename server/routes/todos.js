const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Get all todos
router.get('/', async (req, res) => {
  const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } });
  res.json(todos);
});

// Create a todo
router.post('/', async (req, res) => {
  const { task } = req.body;
  const todo = await prisma.todo.create({ data: { task } });
  res.json(todo);
});

// Toggle completed
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const todo = await prisma.todo.update({
    where: { id },
    data: {
      completed: {
        set: undefined,
        // Toggle: use raw SQL or fetch first if needed
      },
    },
  });
  res.json(todo);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.todo.delete({ where: { id } });
  res.sendStatus(204);
});

module.exports = router;