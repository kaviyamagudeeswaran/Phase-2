const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByPitch,
} = require("../controllers/commentController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, addComment);
router.get("/:pitchId", getCommentsByPitch);

module.exports = router;
