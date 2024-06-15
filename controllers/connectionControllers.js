// controllers/connectionController.js
const Connection = require('../model/connectionModel');
const User = require("../model/user_model");
const Company = require("../model/company_model");

const createConnection = async (req, res) => {
    try {
        const { userId, companyId, reason, subject, message, email, linkedinurl } = req.body;

        // Validate that the user and the company exist
        const user = await User.findById(userId);
        const connectionCompany = await Company.findById(companyId);  //switched to company, not sure why connection

        if (!user || !connectionCompany) {
            return res.status(400).json({ success: false, message: 'User or company not found' });
        }

        const newConnection = new Connection({
            userId,
            companyId,
            reason,
            subject,
            message,
            email,
            linkedinurl,
        });

        await newConnection.save();

        user.connections.push(newConnection._id);
        await user.save();


        res.status(201).json({ success: true, message: 'Connection created successfully', data: newConnection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const viewAllConnections = async (req, res) => {
    try {
        const connections = await Connection.find().populate('userId connectionId');

        res.status(200).json({ success: true, data: connections });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


module.exports = { createConnection, viewAllConnections };
