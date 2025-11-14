const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { pitchId, text } = req.body;

    if (!text || !pitchId) {
      return res
        .status(400)
        .json({ message: "Pitch and comment text required" });
    }

    const comment = new Comment({
      pitch: pitchId,
      user: req.user.id,
      text,
    });

    await comment.save();
    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ message: "Server error while adding comment" });
  }
};

exports.getCommentsByPitch = async (req, res) => {
  try {
    const { pitchId } = req.params;
    const comments = await Comment.find({ pitch: pitchId }).populate(
      "user",
      "name"
    );
    res.json(comments);
  } catch (err) {
    console.error("Fetch comments error:", err);
    res.status(500).json({ message: "Server error while fetching comments" });
  }
};
