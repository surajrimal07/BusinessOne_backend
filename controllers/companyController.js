const { json } = require("express");
const Company = require("../model/company_model");

const createCompany = async (req, res) => {
  try {
    const companyData = req.body;

    // Create a new instance of the Company model with the provided data
    const company = new Company(companyData);

    const savedCompany = await company.save();

    res.status(200).json({
      success: true,
      message: "Created !!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const viewCompany = async (req, res) => {
  try {
    const companyName = req.params.name;
    const regex = new RegExp(companyName, "i");
    const companies = await Company.find({ name: regex });

    if (!companies) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createCompany,
  viewCompany,
};
