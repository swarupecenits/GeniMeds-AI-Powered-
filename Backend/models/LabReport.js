const mongoose = require('mongoose');
const labReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl:{
    type:String,
    required: [true,'File path is required'],
    },
  results: [{
    testName: String,
    value: String,
    normalRange: String,
    status: String
  }],
  uploadedAt: { type: Date, default: Date.now }
});
module.exports =mongoose.model.LabReport || mongoose.model('LabReport', labReportSchema);
