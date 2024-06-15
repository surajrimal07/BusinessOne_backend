const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dio3qwd9q/image/upload//fl_attachment:10212377_ev7xiw//v1718440959/10212377_ev7xiw.jpg"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;