const Bookmark = require("../models/Bookmark");

exports.toggleBookmark = async (req, res) => {
  try {
    const { pitchId } = req.body;

    const existing = await Bookmark.findOne({
      user: req.user.id,
      pitch: pitchId,
    });

    if (existing) {
      await Bookmark.findByIdAndDelete(existing._id);
      return res.json({ message: "Bookmark removed" });
    }

    const newBookmark = new Bookmark({
      user: req.user.id,
      pitch: pitchId,
    });

    await newBookmark.save();
    res.status(201).json({ message: "Bookmark added", bookmark: newBookmark });
  } catch (err) {
    console.error("Toggle bookmark error:", err);
    res.status(500).json({ message: "Server error while toggling bookmark" });
  }
};

exports.getMyBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).populate(
      "pitch"
    );
    res.json(bookmarks);
  } catch (err) {
    console.error("Fetch bookmarks error:", err);
    res.status(500).json({ message: "Server error while fetching bookmarks" });
  }
};
