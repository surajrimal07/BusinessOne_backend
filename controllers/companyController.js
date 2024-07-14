const { json } = require("express");
const Company = require("../model/company_model");
const User = require("../model/user_model");


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
      isClaimed: !req.user.isAdmin
    });

    await newCompany.save();
    console.log(req.user)
    if (!req.user.isAdmin) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: { claimedCompany: newCompany._id }
      });
    }


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
    const companies = await Company.find({ isDeleted: { $ne: true } });
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
    const companies = await Company.find({
      _id: companyName,
      isDeleted: { $ne: true },
    });

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
  // console.log("Category:", category);
  try {
    const companies = await Company.find({
      category: category,
      isDeleted: { $ne: true },
    });
    res.status(200).json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const viewNewAddedCompany = async (req, res) => {
  try {
    const companies = await Company.find({ isDeleted: { $ne: true } }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Company.findById(id);

    if (!content) {
      return res.status(404).json({ message: "Company not found" });
    }

    content.isDeleted = true;
    const updatedContent = await content.save();

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCompany = async (req, res) => {
  const companyId = req.params.id; 
  console.log(req.body);
  console.log(req.files);

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }

    const companyBasicDetails = JSON.parse(req.body.companyBasicDetails);
    const companyProductDetails = JSON.parse(req.body.companyProductDetails);
    const companyTimelineDetails = JSON.parse(req.body.companyTimelineDetails);
    const companyFundingDetails = JSON.parse(req.body.companyFundingDetails);
    const companyDetails = JSON.parse(req.body.companyDetails);
    const targetMarketDetail = JSON.parse(req.body.targetMarketDetail);

    // Update image URLs to the parsed JSON objects if new images are uploaded
    if (req.files && req.files.companyImage) {
      companyBasicDetails.companyImage = `${process.env.BACKEND_URL}/uploads/${req.files.companyImage[0].filename}`;
    }

    // Update product images
    companyProductDetails.products.forEach((product, index) => {
      if (req.files.productImages && req.files.productImages[index]) {
        product.image = `${process.env.BACKEND_URL}/uploads/${req.files.productImages[index].filename}`;
      }
    });

    // Update timeline images
    companyTimelineDetails.timelines.forEach((timeline, index) => {
      if (req.files.timelineImages && req.files.timelineImages[index]) {
        timeline.image = `${process.env.BACKEND_URL}/uploads/${req.files.timelineImages[index].filename}`;
      }
    });

    // Update company details
    company.set({
      ...companyBasicDetails,
      products: companyProductDetails.products,
      timelines: companyTimelineDetails.timelines,
      fundings: companyFundingDetails.fundings,
      basicDescription: companyDetails.basicDescription,
      marketDescription: targetMarketDetail.marketDescription,
      businesstype: targetMarketDetail.businesstype,
      revenueStream: targetMarketDetail.revenueStream,
    });

    await company.save();
    res.status(200).send(company);
  } catch (error) {
    console.error("Error updating company:", error);
    if (error.name === "ValidationError") {
      res.status(400).send(error.errors);
    } else {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  }
};

module.exports = {
  createCompany,
  viewAllCompany,
  viewCompanyByCategory,
  viewCompany,
  viewNewAddedCompany,
  deleteCompany,
  updateCompany,
};
