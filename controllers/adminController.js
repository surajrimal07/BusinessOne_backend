const { json } = require("express");
const User = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const { email, userName, password } = req.body;

  if (!userName || !email || !password) {
    return res.json({
      success: false,
      message: "Please Enter all the fields",
    });
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User exists",
      });
    }

    const generateSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, generateSalt);

    const newUser = new User({
      userName: userName,
      email: email,
      password: encryptedPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Created !!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Login Codes

const loginAdmin = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName && !password) {
    return res.json({
      success: false,
      message: "Please Enter all the fields",
    });
  }

  try {
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.json({
        success: false,
        message: "Account doesnot exists !!",
      });
    }

    const passwordToCompare = user.password;
    const isMatched = await bcrypt.compare(password, passwordToCompare);
    if (!isMatched) {
      return res.json({
        success: false,
        message: "Wrong passsword !!!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET);
    res.status(200).json({
      success: true,
      token: token,
      // userData: user,
      message: "Logged In successfully",
    });
  } catch (error) {
    res.json("Server Error");
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
};
