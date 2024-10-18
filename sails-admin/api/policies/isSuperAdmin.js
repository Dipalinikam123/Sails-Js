const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; // Ensure your secret key is set in your environment variables

// api/middlewares/isAuthenticated.js
module.exports = async function (req, res, next) {
  // console.log('-policy token---', req.session.token);

  // Check for the presence of a token in the session
  if (!req.session.token) {
    return res.status(401).redirect('/login');
  }

  try {
    const decoded = jwt.verify(req.session.token, secretKey);
    const userId = decoded._id;

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user;

    // console.log('-policy user---', req.user);

    if (user.role !== 0) {
      return res.status(403).json({ message: 'Access denied. Super Admin only.' });
    }

    return next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
