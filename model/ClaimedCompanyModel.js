const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyClaimSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  position: { type: String },
  document1: { type: String },
  document2: { type: String },
  verified: { type: Boolean, default: false },
  isRejected: { type: Boolean, default: false }
});

const CompanyClaim = mongoose.model('CompanyClaim', companyClaimSchema);

module.exports = CompanyClaim;
