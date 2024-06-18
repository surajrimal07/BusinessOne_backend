const { json } = require("express");
const Company = require("../model/company_model");

const createCompany = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  try {
    // Parse JSON fields
    const companyBasicDetails = JSON.parse(req.body.companyBasicDetails);
    const companyProductDetails = JSON.parse(req.body.companyProductDetails);
    const companyTimelineDetails = JSON.parse(req.body.companyTimelineDetails);
    const companyFundingDetails = JSON.parse(req.body.companyFundingDetails);
    const companyDetails = JSON.parse(req.body.companyDetails);
    const targetMarketDetail = JSON.parse(req.body.targetMarketDetail);

    // Add image URLs to the parsed JSON objects
    if (req.files["companyImage"]) {
      companyBasicDetails.companyImage = `${process.env.BACKEND_URL}/uploads/${req.files["companyImage"][0].filename}`;
      console.log("Company Image:", companyBasicDetails.companyImage);
    }

    companyProductDetails.products.forEach((product, index) => {
      if (req.files["productImages"] && req.files["productImages"][index]) {
        product.image = `${process.env.BACKEND_URL}/uploads/${req.files["productImages"][index].filename}`;
      }
    });

    companyTimelineDetails.timelines.forEach((timeline, index) => {
      if (req.files["timelineImages"] && req.files["timelineImages"][index]) {
        timeline.image = `${process.env.BACKEND_URL}/uploads/${req.files["timelineImages"][index].filename}`;
      }
    });

    const newCompany = new Company({
      ...companyBasicDetails,
      products: companyProductDetails.products,
      timelines: companyTimelineDetails.timelines,
      fundings: companyFundingDetails.fundings,
      basicDescription: companyDetails.basicDescription,
      marketDescription: targetMarketDetail.marketDescription,
      businesstype: targetMarketDetail.businesstype,
      revenueStream: targetMarketDetail.revenueStream,
    });

    await newCompany.save();
    res.status(201).send(newCompany);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send(error.errors);
    }
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const viewAllCompany = async (req, res) => {
  try {
    const companies = await Company.find();
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

const viewCompany = async (req, res) => {
  console.log(req.params.id);
  try {
    const companyName = req.params.id;
    // const regex = new RegExp(companyName, "i");
    const companies = await Company.find({ _id: companyName });

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

const viewCompanyByCategory = async (req, res) => {
  const { category } = req.query;
  console.log("Category:", category);
  try {
    const companies = await Company.find({ category: category });
    res.status(200).json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCompany,
  viewAllCompany,
  viewCompanyByCategory,
  viewCompany,
};
