// controllers/listController.js
const List = require("../models/List");
const Task = require("../models/Task");

// Get all lists with their tasks
exports.getListsWithTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const lists = await List.find({ userId }).lean();

    const listIds = lists.map((list) => list._id);
    const tasks = await Task.find({ listId: { $in: listIds } });

    const listWithTasks = lists.map((list) => ({
      ...list,
      tasks: tasks.filter(
        (task) => task.listId.toString() === list._id.toString()
      ),
    }));

    res.json(listWithTasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lists", error: err });
  }
};

// Create new task under a list
exports.createTask = async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;

    const task = await Task.create({ title, listId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err });
  }
};
