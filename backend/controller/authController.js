const jwt = require('jsonwebtoken')
const User = require('../models/User.model.js')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  };

// controllers/authController.js
exports.signup = async (req, res) => {
  const { name, email, password } = req.body; // INCLUDE NAME

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({ name, email, password });
    const token = createToken(newUser._id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};


exports.login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        const isPasswordValid = await user.comparePassword(password);
        if (!user || !isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = createToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Failed to login user" });
    }
}