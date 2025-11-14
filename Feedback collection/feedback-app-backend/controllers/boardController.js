const Board = require("../models/Board");

const createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const board = await Board.create({ userId: req.userId, title });
    res.status(201).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create board" });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.userId });
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch boards" });
  }
};

module.exports = { createBoard, getBoards };
