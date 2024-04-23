const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const dbConnect = require("./database/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

dotenv.config();

dbConnect();

const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));

app.use(express.json());

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({limit: '40mb', extended: true}));

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("BusinessOne API Has been started");
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = dbConnect;
