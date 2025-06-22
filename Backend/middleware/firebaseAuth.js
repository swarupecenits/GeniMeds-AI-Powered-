// middleware/authMiddleware.js
const admin = require('../config/firebaseAdmin'); // Corrected path

exports.auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // You can access decoded user details like uid, email, etc.
    next();
  } catch (err) {
    console.error("Firebase token verification failed:", err);
    return res.status(403).json({ message: 'Invalid Firebase token' });
  }
};
