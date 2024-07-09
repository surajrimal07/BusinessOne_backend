const User = require("../model/user_model");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const sendOTP = require("./otpControllers");

//http://localhost:5000/api/user/signup
const signupUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password) {
      return res

        .json({ success: false, message: "Please provide username, email, and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .json({ success: false, message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup error" });
  }
};

//http://localhost:5000/api/user/login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).populate(
      "favroiteCompanies favroiteNews.newsId employeeOf reviews.companyId connections"
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRY_TIME }
    );
    // Remove password from the user object
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    //delete userWithoutPassword._id; yo cahixa app ma so enabling this
    res.json({
      success: true,
      message: "Login success",
      data: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Login error" });
  }
};

//works
//http://localhost:5000/api/user/updateuser
const updateUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      bio,
      darkmode,
      workDomain,
      picture,
      favroiteCompanies,
      favroiteNews,
      interests,
      employeeOf,
      reviews,
      connections,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }

    let updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (bio) updateData.bio = bio;
    if (typeof darkmode !== "undefined") updateData.darkmode = darkmode;
    if (workDomain) updateData.workDomain = workDomain;
    if (picture) updateData.picture = picture;
    if (favroiteCompanies) updateData.favroiteCompanies = favroiteCompanies;
    if (favroiteNews) updateData.favroiteNews = favroiteNews;
    if (interests) updateData.interests = interests;
    if (employeeOf) updateData.employeeOf = employeeOf;
    if (reviews) updateData.reviews = reviews;
    if (connections) updateData.connections = connections;

    const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    }).populate(
      "favroiteCompanies favroiteNews.newsId employeeOf reviews.companyId connections"
    );

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update error", error: error.message });
  }
};


//http://localhost:5000/api/user/deleteuser
const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide an email and password" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }

    //check password too
    if (!bcrypt.compare(password, existingUser.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await User.findOneAndDelete({ email });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion error", error: error.message });
  }
};

// API endpoint to verify OTP
const savePassowrd = async (req, res) => {
  console.log(req.body);
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const checkAdmin = (req, res) => {
  // console.log(req.user)
  if (req.user && req.user.isAdmin) {
    res.status(200).json({
      success: true,
      message: "User is an admin.",
      data: { user: req.user },
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. You must be an admin.",
    });
  }
};

module.exports = {
  loginUser,
  signupUser,
  updateUser,
  deleteUser,
  savePassowrd,
  checkAdmin,
};
