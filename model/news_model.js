
const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({

    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },

});

const news = mongoose.model("news", newsSchema);

module.exports = news;


