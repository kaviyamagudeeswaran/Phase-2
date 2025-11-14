const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = generateToken(newUser);

    res.status(201).json({ token, user: { username, email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ msg: 'Signup error', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user);

    res.status(200).json({ token, user: { username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ msg: 'Login error', error });
  }
};
