const express = require("express");
const router = express.Router();
const { submitOutcome } = require("../controllers/buildController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/build/outcome
router.post("/outcome", authMiddleware, submitOutcome);

module.exports = router;
