const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./Models/todoModel.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://vinayalavalaanp:vinay123@cluster0.jzjkh.mongodb.net/todo');
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

connectDB();

// Add a new todo
// Add a new todo
app.post('/add', async (req, res) => {
    const { task } = req.body;
  
    try {
      if (!task || task.trim() === "") {
        return res.status(400).send("⚠️ Task is required");
      }
  
      // Check if a todo with the same task already exists (case-insensitive)
      const existingTodo = await Todo.findOne({ task: { $regex: new RegExp("^" + task + "$", "i") } });
  
      if (existingTodo) {
        return res.status(409).send("🚫 Todo already exists");
      }
  
      const todo = new Todo({ task });
      await todo.save();
      res.status(201).send("✅ Todo added");
    } catch (err) {
      console.error(err);
      res.status(500).send("❌ Error adding todo");
    }
  });
  

// Get all todos
app.get('/get', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send("Error fetching todos");
  }
});

// Delete a todo
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.send("Todo deleted");
  } catch (err) {
    res.status(500).send("Error deleting todo");
  }
});

// Update a todo's task text or completion status
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  try {
    const updateData = {};
    if (task !== undefined) updateData.task = task;
    if (completed !== undefined) updateData.completed = completed;
    const updated = await Todo.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating todo");
  }
});

// Mark a todo as completed
app.put('/completed/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating completion status");
  }
});

// Start server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});