const express = require("express");
const router = express.Router();
const { createBoard, getBoards } = require("../controllers/boardController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);

module.exports = router;
