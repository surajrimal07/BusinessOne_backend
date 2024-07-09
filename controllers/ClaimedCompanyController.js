const CompanyClaim = require("../model/ClaimedCompanyModel");

async function createCompanyClaim(req, res) {
  const { userId, companyId, fullname, email, position } = req.body;

  try {
    const registrationFilePath = req.files.registration
      ? req.files.registration.path
      : null;
    const citizenshipFilePath = req.files.citizenship
      ? req.files.citizenship.path
      : null;

    const newClaim = new CompanyClaim({
      userId: userId,
      companyId: companyId,
      fullname: fullname,
      position: position,
      email: email,
      registration: registrationFilePath,
      citizenship: citizenshipFilePath,
    });

    const savedClaim = await newClaim.save();
    res.status(201).json(savedClaim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createCompanyClaim,
};
