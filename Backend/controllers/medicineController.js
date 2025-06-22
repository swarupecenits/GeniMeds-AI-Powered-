const Medicine = require('../models/Medicine');
const Prescription = require('../models/Prescription');

exports.extractMedicines = async (req, res) => {
  const prescriptions = await Prescription.find({ user: req.user.uid });
  const medicinesMap = new Map();

  prescriptions.forEach(pres => {
    pres.extractedMedicines.forEach(med => {
      const key = `${req.user.uid}_${med.name}`;
      if (!medicinesMap.has(key)) {
        medicinesMap.set(key, []);
      }
      medicinesMap.get(key).push({
        prescriptionId: pres._id,
        extractedAt: new Date()
      });
    });
  });

  const saved = await Promise.all(
    Array.from(medicinesMap.entries()).map(async ([key, refs]) => {
      const [userId, name] = key.split('_');
      return await Medicine.findOneAndUpdate(
        { user: userId, name },
        {
          $setOnInsert: { user: userId, name },
          $push: { addedFromPrescription: { $each: refs } }
        },
        { upsert: true, new: true }
      );
    })
  );

  res.json({ message: 'Medicines extracted and stored per user', data: saved });
};
