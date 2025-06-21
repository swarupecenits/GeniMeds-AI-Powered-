const Prescription = require('../models/prescription');
const { extractMedicinesFromImage } = require('../services/ocrService');

exports.uploadPrescription = async (req, res) => {
  const fileUrl = req.file.path;
  const extractedMedicines = await extractMedicinesFromImage(fileUrl);

  const prescription = await Prescription.create({
    user: req.user.id,
    fileUrl,
    extractedMedicines
  });

  res.status(201).json(prescription);
};

exports.getUserPrescriptions = async (req, res) => {
  const prescriptions = await Prescription.find({ user: req.user.id });
  res.json(prescriptions);
};
