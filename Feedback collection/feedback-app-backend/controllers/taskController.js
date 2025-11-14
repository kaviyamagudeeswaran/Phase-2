const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Failed to create task" });
  }
};

const getTasksByList = async (req, res) => {
  try {
    const tasks = await Task.find({ listId: req.params.listId });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

module.exports = { createTask, getTasksByList };
