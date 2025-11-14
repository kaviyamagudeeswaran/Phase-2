const express = require("express");
const router = express.Router();
const {
  toggleBookmark,
  getMyBookmarks,
} = require("../controllers/bookmarkController");
const auth = require("../middleware/authMiddleware");

router.post("/toggle", auth, toggleBookmark);
router.get("/", auth, getMyBookmarks);

module.exports = router;
