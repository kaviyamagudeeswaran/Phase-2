const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted successfully" });
};

const getStats = async (req, res) => {
  const userCount = await User.countDocuments();
  res.json({ totalUsers: userCount });
};

module.exports = {
  getAllUsers,
  deleteUser,
  getStats,
};
