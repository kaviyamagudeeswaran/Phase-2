const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createTask, getTasksByList } = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/:listId", auth, getTasksByList);

module.exports = router;
