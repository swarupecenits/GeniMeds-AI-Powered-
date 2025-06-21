
exports.extractMedicinesFromImage = async (filePath) => {
  console.log('Extracting medicines from:', filePath);

  // Mocking a simulated OCR extraction from image
  // In real case, integrate Tesseract or call a Python script here

  return [
    {
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "Twice a day",
      duration: "5 days",
      instructions: "After food"
    },
    {
      name: "Amoxicillin",
      dosage: "250mg",
      frequency: "Thrice a day",
      duration: "7 days",
      instructions: "Before meals"
    }
  ];
};
