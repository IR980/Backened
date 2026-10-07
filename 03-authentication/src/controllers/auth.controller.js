const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });
  if(isUserExists) {
    return res.status(409).json({ message: "User already exists" });
  }

    const user = new userModel({ username, email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token,)

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = { registerUser };