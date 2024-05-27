const mongoose = require("mongoose");


const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true }, // firstname and lastname
  email: { type: String, required: true, unique: true }, //email {unique}
  password: { type: String, required: true },  //hashed password {bcrypt}
  workDomain: String, //domain of the user sector eg: "Healthcare", "Education", "Construction & Real estate"
  picture: String, //aws bucket or cloudnary url
  //ownerOf: [{ type: Schema.Types.ObjectId, ref: 'Company' }], //list of companies the user owns if any //not necessary according to pratik sir
  favroiteCompanies: [{ type: Schema.Types.ObjectId, ref: 'Company' }], //list of favorite companies

  favroiteNews: [String], //list of favorite news
  interests: [String], //list of interests

  employeeOf: [{ type: Schema.Types.ObjectId, ref: 'Company' }], //list of companies the user is employee of
  reviews: [
    {
      companyId: { type: Schema.Types.ObjectId, ref: 'Company' }, //company id
      rating: { type: Number, required: true }, //rating 1-5
      comment: String, //comment
      date: { type: Date, default: Date.now } //date of review
    }
  ],
  connections: [{ type: Schema.Types.ObjectId, ref: 'Connection' }], //list of connections
});


const User = mongoose.model('User', userSchema);

module.exports = User;