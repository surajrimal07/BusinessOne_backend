const mongoose = require("mongoose");

const workDomainschema = mongoose.Schema({
  workDomain: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const workDomain = mongoose.model("workdomain", workDomainschema);
module.exports = workDomain;
