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
    let user = await User.findOne({ uid: decoded.uid });

    // If user doesn't exist, create a new one
    if (!user) {
      const { name } = req.body;
      user = new User({
        uid: decoded.uid,
        email: decoded.email,
        name: name || decoded.name || '',
        photoURL: decoded.picture || null, // Store Google profile picture
        loginMethod: decoded.firebase.sign_in_provider === 'google.com' ? 'google' : 'email'
      });
      await user.save();
    } else {
      // Update existing user with latest info from Google if needed
      let updated = false;
      if (decoded.picture && user.photoURL !== decoded.picture) {
        user.photoURL = decoded.picture;
        updated = true;
      }
      if (decoded.name && user.name !== decoded.name && !req.body.name) {
        user.name = decoded.name;
        updated = true;
      }
      // If name is provided in request body, use that instead
      if (req.body.name && user.name !== req.body.name) {
        user.name = req.body.name;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    }

    res.status(200).json({ message: 'User synced with MongoDB', user });
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).json({ message: 'Internal error', error: err.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);

    const user = await User.findOne({ uid: decoded.uid }).select('-__v');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Internal error', error: err.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const { name } = req.body;

    const user = await User.findOneAndUpdate(
      { uid: decoded.uid },
      { name },
      { new: true, select: '-__v' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Internal error', error: err.message });
  }
};
