const Contact = require("../model/contactModel");

const createContact = async (req, res) => {
  console.log(req.body);
  try {
    const { fullname, email, message, phone, address } = req.body;

    if (!fullname || !email || !message || !phone || !address) {
      return res.json({
        success: false,
        message: "Please provide all information.",
      });
    }

    const newContact = new Contact({
      fullname,
      email,
      phone,
      address,
      message,
    });

    await newContact.save();

    res.json({
      success: true,
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup error" });
  }
};

const viewAllContact = async (req, res) => {
  try {
    const contact = await Contact.find({ isDeleted: { $ne: true } });
    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = { createContact,viewAllContact };
