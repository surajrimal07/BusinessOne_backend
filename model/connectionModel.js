//user le pahila ko kaslai conenction or connect gareko thiyo tesko history

const mongoose = require("mongoose");

const { Schema } = mongoose;


const connectionSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' }, //user id
    connectionId: { type: Schema.Types.ObjectId, ref: 'User' }, //connection id
    date: { type: Date, default: Date.now }, //date of connection
    reason: String, //reason for connection
    status: { type: String, default: "pending" }, //status of connection {pending, accepted, rejected}
    subject: String,
    message: String,
    email: String,
    linkedinurl: String,
});



const Connection = mongoose.model('User', connectionSchema);


module.exports = Connection;







