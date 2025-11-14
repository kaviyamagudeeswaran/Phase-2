// routes/listRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getListsWithTasks,
  createTask,
} = require("../controllers/listController");

// ✅ Get all lists + tasks
router.get("/lists", authMiddleware, getListsWithTasks);

// ✅ Create task under list
router.post("/lists/:listId/tasks", authMiddleware, createTask);

module.exports = router;
