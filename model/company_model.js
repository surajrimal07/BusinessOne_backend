const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const TimelineSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const FundingSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
});

const CompanySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  companyDescription: { type: String, required: true },
  extendedDate: { type: Date },
  companyImage: { type: String },
  contentData: { type: String },
  website: { type: String },
  registration: { type: Date },
  facebook: { type: String },
  products: [ProductSchema],
  timelines: [TimelineSchema],
  fundings: [FundingSchema],
  basicDescription: { type: String },
  marketDescription: { type: String },
  businesstype: { type: String },
  revenueStream: { type: String },
});

module.exports = mongoose.model("Company", CompanySchema);
