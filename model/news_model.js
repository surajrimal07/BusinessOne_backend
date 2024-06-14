const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
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

const news = mongoose.model("news", newsSchema);

module.exports = news;
