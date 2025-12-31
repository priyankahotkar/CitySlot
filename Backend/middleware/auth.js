const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { auth: firebaseAuth } = require('../config/firebase');

/**
 * JWT-based protection (used for ALL protected routes)
 */
const protect = asyncHandler(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || user.isBlocked) {
      res.status(401);
      throw new Error('User not authorized');
    }

    req.user = user;
    next();
  } catch {
    res.status(401);
    throw new Error('Invalid or expired token');
  }
});

/**
 * Firebase verification (ONLY for login/signup)
 */
const verifyFirebaseToken = asyncHandler(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(401);
    throw new Error('No Firebase token provided');
  }

  const token = req.headers.authorization.split(' ')[1];

  const decodedToken = await firebaseAuth.verifyIdToken(token);

  if (!decodedToken.email_verified) {
    res.status(403);
    throw new Error('Email not verified');
  }

  let user = await User.findOne({
    $or: [{ firebaseUid: decodedToken.uid }, { email: decodedToken.email }]
  });

  if (!user) {
    user = await User.create({
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email.split('@')[0],
      firebaseUid: decodedToken.uid,
      photoURL: decodedToken.picture || ''
    });
  } else {
    user.lastLogin = Date.now();
    await user.save();
  }

  req.user = user;
  next();
});

/**
 * Role-based access control
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error('Forbidden');
    }
    next();
  };
};

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

module.exports = {
  protect,
  verifyFirebaseToken,
  authorize,
  generateToken
};
