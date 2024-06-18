const { json } = require("express");
const WorkDomain = require("../model/workDomainModel");

const createWorkDomain = async (req, res) => {
  const { workDomain } = req.body;

  if (!workDomain) {
    return res.json({
      success: false,
      message: "Please Enter all the fields",
    });
  }
  try {
    const existingDomain = await WorkDomain.findOne({ workDomain: workDomain });
    if (existingDomain) {
      return res.json({
        success: false,
        message: "Domain exists",
      });
    }
    const newWorkDomain = new WorkDomain({
      workDomain: workDomain,
    });

    await newWorkDomain.save();

    res.status(200).json({
      success: true,
      message: "Created !!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getWorkDomain = async (req, res) => {
  try {
    const contents = await WorkDomain.find();
    res.status(200).json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const testWork= async(req,res)=>{
  res.json({
    success: true,
    message: "BusinessOne API Has been started and the test is success",
  });
  console.log("BusinessOne API Has been started and the test is success");

}

module.exports = {
  createWorkDomain,
  getWorkDomain,
  testWork
};
