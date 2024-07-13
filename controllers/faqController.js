const FaqModel = require('../model/faqModel');

const createFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ success: false, message: "All required fields must be provided" });
        }

        const newFaq = new FaqModel({
            question,
            answer
        });

        const savedFaq = await newFaq.save();

        res.status(201).json({ success: true, message: "FAQ created successfully", data: savedFaq });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while creating the FAQ" });
    }
};

const viewAllFaq = async (req, res) => {
    try {
        const faqs = await FaqModel.find({ isDeleted: { $ne: true } });
        res.status(200).json({
            success: true,
            faqs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { createFaq, viewAllFaq };