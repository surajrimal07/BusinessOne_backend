const CompanyClaim = require("../model/ClaimedCompanyModel");
const User = require("../model/user_model");
const Company = require("../model/company_model");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.email_app_password,
  },
});

// Function to send OTP via email
const sendMail = async (email, message, subject) => {
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw new Error("Failed to send Mail");
  }
};

async function createCompanyClaim(req, res) {
  console.log(req.files);
  console.log(req.body);

  if (!req.user || !req.user.email) {
    return res
      .status(403)
      .json({ success: false, message: "User not authenticated properly." });
  }

  try {
    const { company_id, position } = req.body;
    const userEmail = req.user.email;
    const message =
      "The claim tha tyou have made for company is under verification and it might take few working days to complete the verification process.";
    const subject = "Company claim verification under process.";

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // const registrationFilePath = req.files['document1'] && req.files['document1'][0]
    //   ? req.files['document1'][0].path.replace(/\\/g, "/")
    //   : null;

    const registrationFilePath =
      req.files["document1"] && req.files["document1"][0]
        ? `${process.env.BACKEND_URL}/uploads/${req.files[
            "document1"
          ][0].filename.replace(/\\/g, "/")}`
        : null;

    const citizenshipFilePath =
      req.files["document2"] && req.files["document2"][0]
        ? `${process.env.BACKEND_URL}/uploads/${req.files[
            "document2"
          ][0].filename.replace(/\\/g, "/")}`
        : null;

    const newClaim = new CompanyClaim({
      userId: user._id,
      companyId: company_id,
      position: position,
      document1: registrationFilePath,
      document2: citizenshipFilePath,
    });

    await newClaim.save();
    await sendMail(userEmail, message, subject);

    res.json({
      success: true,
      message: "Company claim successfully registered.",
    });
  } catch (err) {
    console.error("Failed to create company claim:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
}

async function getAllClaims(req, res) {
  try {
    const claims = await CompanyClaim.find({ verified: { $ne: true } })
      .populate("userId", "username email phone")
      .populate("companyId", "name address");
    res.json({ success: true, data: claims });
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function verifyClaim(req, res) {
  const { claimId } = req.params;
  const { status } = req.body;

  console.log(req.body);

  try {
    const claim = await CompanyClaim.findById(claimId);
    if (!claim) {
      return res.json({ success: false, message: "Claim not found" });
    }

    // Check if the user exists before verifying the claim
    const user = await User.findById(claim.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Fetch the company and update its isClaimed status
    const company = await Company.findById(claim.companyId);
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }

    // Update the claim, user, and company
    claim.verified = status;
    claim.isRejected = false;
    await claim.save();

    if (status) {
      if (!user.claimedCompany.includes(claim.companyId)) {
        user.claimedCompany.push(claim.companyId);
      }
      await user.save();

      company.isClaimed = true; // Set the company as claimed
      await company.save();
    }

    const userEmail = user.email;
    const message =
      "The claim tha tyou have made for company is  verified  and now you can manage the company information and data.";
    const subject = "Company claim verification process success.";

    await sendMail(userEmail, message, subject);

    res.json({
      success: true,
      message: "Claim verification status updated and company claimed",
      claim,
    });
  } catch (error) {
    console.error("Failed to verify claim and update company:", error);
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
}

async function rejectClaim(req, res) {
  const { claimId } = req.params;
  const { status } = req.body;

  console.log(req.body);

  try {
    const claim = await CompanyClaim.findById(claimId);
    if (!claim) {
      return res.json({ success: false, message: "Claim not found" });
    }

    // Check if the user exists before verifying the claim
    const user = await User.findById(claim.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Fetch the company and update its isClaimed status
    const company = await Company.findById(claim.companyId);
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }

    const userEmail = user.email;
    const message = "The claim tha tyou have made for company is  rejected.";
    const subject = "Company claim verification process rejected.";

    claim.isRejected = status;
    await claim.save();
    await sendMail(userEmail, message, subject);

    res.json({
      success: true,
      message: "Rejected company claimed verification status",
      claim,
    });
  } catch (error) {
    console.error("Failed to reject claim and update company:", error);
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
}

module.exports = {
  createCompanyClaim,
  getAllClaims,
  verifyClaim,
  rejectClaim,
};
