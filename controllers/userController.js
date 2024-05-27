
const User = require("../model/user_model");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");


//http://localhost:5000/api/user/signup
const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide username, email, and password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ message: "Signup error" });
    }
};


//http://localhost:5000/api/user/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });

        res.status(200).json({ message: "Login success", data: user, token });

    } catch (error) {
        res.status(500).json({ message: "Login error" });
    }
}


module.exports = { loginUser, signupUser };