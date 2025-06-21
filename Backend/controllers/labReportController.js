const LabReport = require('../models/LabReport');
const { extractLabValues } = require('../services/labOcrService');

exports.uploadLabReport = async (req, res) => {
  const fileUrl = req.file.path;
  const results = await extractLabValues(fileUrl);
  const report = await LabReport.create({
    user: req.user.id,
    fileUrl,
    results
  });
  res.status(201).json(report);
};