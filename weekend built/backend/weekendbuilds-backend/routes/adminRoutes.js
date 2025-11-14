const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getStats,
} = require("../controllers/adminController");

// Make sure these handlers exist and are functions
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/stats", getStats);

module.exports = router;
