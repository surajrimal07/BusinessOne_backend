const { json } = require("express");
const Company = require("../model/company_model");

const createCompany = async (req, res) => {
  try {
      const { name, sections, isUserAdmin, isCompanyClaimed, claimedBy } = req.body;

      const newCompany = new Company({
          name,
          sections,
          isUserAdmin,
          isCompanyClaimed,
          claimedBy
      });

      await newCompany.save();

      res.status(201).json({ success: true, message: 'Company created successfully', data: newCompany });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
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
