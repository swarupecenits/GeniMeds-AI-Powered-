// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // REGISTER Controller
// exports.register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "Email already in use" });
//         }

//         const newUser = new User({ name, email, password });
//         await newUser.save();

//         res.status(201).json({
//             success: true,
//             message: "User registered successfully"
//         });
//     } catch (err) {
//         console.error("Error during registration:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: err.message
//         });
//     }
// };

// // LOGIN Controller
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }


//         if (user.password !== password) {
//             return res.status(400).json({ success: false, message: "Invalid email or password" });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//         res.json({
//             success: true,
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });
//     } catch (err) {
//         console.error("Error during login:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: err.message
//         });
//     }
// };
const User = require('../models/User');
const admin = require('../config/firebaseAdmin');

exports.syncFirebaseUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);

    // Search for existing user by UID
    let user = await User.findOne({ uid: decoded.uid }); // ✅ uid instead of firebaseUid

    // If user doesn't exist, create a new one
    if (!user) {
      const { name } = req.body;
      user = new User({
        uid: decoded.uid,                      // ✅ field name matches schema
        email: decoded.email,
        name: name || decoded.name || ''       // fallback if name is missing
      });
      await user.save();
    }

    res.status(200).json({ message: 'User synced with MongoDB', user });
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).json({ message: 'Internal error', error: err.message });
  }
};
