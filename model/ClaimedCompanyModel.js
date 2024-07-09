const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define CompanyClaim schema
const companyClaimSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    fullname: { type: String },
    email: { type: String },
    position: { type: String },
    verified: { type: Boolean, default: false },
    isRejected: { type: Boolean, default: false }
});

// Create CompanyClaim model
const CompanyClaim = mongoose.model('CompanyClaim', companyClaimSchema);

module.exports = CompanyClaim;
