// controllers/buildController.js

const Outcome = require("../models/Outcome");

exports.submitOutcome = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const newOutcome = new Outcome({
      user: req.user.id,
      description,
    });

    await newOutcome.save();

    res
      .status(201)
      .json({
        message: "Outcome submitted successfully!",
        outcome: newOutcome,
      });
  } catch (error) {
    console.error("Error submitting outcome:", error);
    res.status(500).json({ message: "Server error while submitting outcome" });
  }
};
