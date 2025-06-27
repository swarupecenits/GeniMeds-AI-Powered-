const Prescription = require('../models/Prescription');
const { extractMedicinesFromImage } = require('../services/ocrService');

exports.uploadPrescription = async (req, res) => {
  const fileUrl = req.file.path;
  const extractedMedicines = await extractMedicinesFromImage(fileUrl);

  const prescription = await Prescription.create({
    user: req.user.uid,
    fileUrl,
    extractedMedicines
  });

  res.status(201).json(prescription);
};

exports.getUserPrescriptions = async (req, res) => {
  const prescriptions = await Prescription.find({ user: req.user.uid });
  res.json(prescriptions);
};
