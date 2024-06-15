const express = require("express");
const path = require("path");
const dbConnect = require("./database/db");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

dbConnect();

const corsPolicy = {
  flightContinue: true,
  credentials: true,
  optionSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-csrf-token']
};

app.use(cors(corsPolicy));

app.use(express.json());

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ limit: '40mb', extended: true }));

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("BusinessOne API Has been started");
});

app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/domain", require("./routes/workDomainRoute"));
app.use("/api/company", require("./routes/companyRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/news", require("./routes/newsRoute"));

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: 'The requested resource was not found on this server.' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = dbConnect;
