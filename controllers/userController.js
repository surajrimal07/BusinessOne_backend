
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

        const user = await User.findOne({ email }).populate('favroiteCompanies favroiteNews.newsId employeeOf reviews.companyId connections');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });

        res.status(200).json({ message: "Login success", data: user, token });

    } catch (error) {
        res.status(500).json({ message: "Login error" });
    }
}


//need testing
const updateUser = async (req, res) => {
    try {
        const { username, email, password, bio, darkmode, workDomain, picture, favroiteCompanies, favroiteNews, interests, employeeOf, reviews, connections } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please provide an email" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }

        let updateData = {};
        if (username) updateData.username = username;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        if (bio) updateData.bio = bio;
        if (typeof darkmode !== 'undefined') updateData.darkmode = darkmode;
        if (workDomain) updateData.workDomain = workDomain;
        if (picture) updateData.picture = picture;
        if (favroiteCompanies) updateData.favroiteCompanies = favroiteCompanies;
        if (favroiteNews) updateData.favroiteNews = favroiteNews;
        if (interests) updateData.interests = interests;
        if (employeeOf) updateData.employeeOf = employeeOf;
        if (reviews) updateData.reviews = reviews;

        const updatedUser = await User.findOneAndUpdate({ email }, updateData, { new: true });

        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Update error", error: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please provide an email" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }

        await User.findOneAndDelete({ email });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Deletion error", error: error.message });
    }
};


// const getUser = async (req, res) => {
//     try {
//         const { email } = req.query;

//         if (!email) {
//             return res.status(400).json({ message: "Please provide an email" });
//         }

//         const user = await User.findOne({ email }).populate('favroiteCompanies favroiteNews.newsId employeeOf reviews.companyId connections');

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({ data: user });
//     } catch (error) {
//         res.status(500).json({ message: "Retrieval error", error: error.message });
//     }
// };


//to do
const createConnection = async (req, res) => { };


//setup node mailer
const forgetPassword = async (req, res) => { };




module.exports = { loginUser, signupUser, updateUser, deleteUser, createConnection, forgetPassword };