const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));
app.use('/api/lab-reports', require('./routes/labReportRoutes'));
app.use('/api/lab-analysis', require('./routes/labReportsRoutes')); // New lab reports analysis
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/ai-chat', require('./routes/aichatRoutes'));
app.use('/api/chat-history', require('./routes/chatHistoryRoutes')); // Chat history routes
app.use('/api/analyze', require('./routes/analysisRoutes'));
app.get('/', (req, res) => {
  res.send('✅ GeniMeds backend is running.');
});

module.exports = app;