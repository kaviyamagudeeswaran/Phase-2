// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  description: String,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  dueDate: Date,
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
