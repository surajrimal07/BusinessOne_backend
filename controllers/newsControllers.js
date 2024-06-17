const News = require('../model/news_model');

const createNews = async (req, res) => {
    try {
        const { title, tags, shortDescription, description, image } = req.body;

        if (!title || !tags || !shortDescription || !description) {
            return res.status(400).json({ success: false, message: "All required fields must be provided" });
        }

        const newNews = new News({
            title,
            tags,
            shortDescription,
            description,
            image: image || "https://res.cloudinary.com/dio3qwd9q/image/upload//fl_attachment:10212377_ev7xiw//v1718440959/10212377_ev7xiw.jpg"
        });

        const savedNews = await newNews.save();

        res.status(201).json({ success: true, message: "News article created successfully", data: savedNews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while creating the news article" });
    }
};

module.exports = {
    createNews
};
