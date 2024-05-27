const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
});


const teamMemberSchema = new Schema({
    ownerId: String,
    role: String,
    designation: String,
    name: String,
    linkedInUrl: String,
    reviews: [reviewSchema]
});

export default {reviewSchema,teamMemberSchema};