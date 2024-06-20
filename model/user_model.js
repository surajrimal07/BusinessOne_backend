const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true }, // firstname and lastname
  email: { type: String, required: true, unique: true }, //email {unique}
  password: { type: String, required: true },  //hashed password {bcrypt}
  bio: String, //bio of the user
  darkmode: { type: Boolean, default: false }, //darkmode true or false
  workDomain: String, //domain of the user sector eg: "Healthcare", "Education", "Construction & Real estate"
  picture: String, //aws bucket or cloudinary url
  isAdmin: { type: Boolean, default: false }, //admin true or false //yo just for testing, paxi milau hai 
  favroiteCompanies: [
    {
      type: Schema.Types.ObjectId, ref: 'Company'
    }

  ], //list of favorite companies
  favroiteNews: [
    {
      newsId: { type: Schema.Types.ObjectId, ref: 'News' }, //news id
      date: { type: Date, default: Date.now } //date of favorite
    }
  ], //list of favorite news
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
