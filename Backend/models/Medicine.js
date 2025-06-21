const mongoose = require('mongoose');
const medicineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  genericNames: [String],
  source: String,
  addedFromPrescription: [{
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
    extractedAt: { type: Date, default: Date.now }
  }],
  addedAt: { type: Date, default: Date.now }
});
medicineSchema.index({ user: 1, name: 1 }, { unique: true });
module.exports = mongoose.model.Medicine|| mongoose.model('Medicine', medicineSchema);
