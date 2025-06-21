const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
    },
    fileUrl:{
    type:String,
    required: [true,'File path is required'],
    },
    extractedMedicines: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
    }],
    doctorName: String,
    hospitalName: String,
    prescribedDate: Date,
    notes: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);
