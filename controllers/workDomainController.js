const { json } = require("express");
const WorkDomain = require("../model/workDomainModel");


const createWorkDomain = async (req, res) => {
  const { workDomain } = req.body;

  if (!workDomain ) {
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
      workDomain:workDomain
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



module.exports = {
  createWorkDomain,
};
