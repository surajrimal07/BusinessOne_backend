import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true }, // firstname and lastname
  email: { type: String, required: true, unique: true }, //email {unique}
  password: { type: String, required: true }, //hashed password {bcrypt}
  workDomain: {type: String}, //domain of the user sector eg: "Healthcare", "Education", "Construction & Real estate"
//   picture: String, //aws bucket or cloudnary url
  ownerOf: [{ type: Schema.Types.ObjectId, ref: "Company" }], //list of companies the user owns if any
  favroiteCompanies: [{ type: Schema.Types.ObjectId, ref: "Company" }], //list of favorite companies
  employeeOf: [{ type: Schema.Types.ObjectId, ref: "Company" }], //list of companies the user is employee of
  reviews: [
    {
      companyId: { type: Schema.Types.ObjectId, ref: "Company" }, //company id
      rating: { type: Number, required: true }, //rating 1-5
      comment: String, //comment
      date: { type: Date, default: Date.now }, //date of review
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
