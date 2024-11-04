const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = async function (req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded._id;

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    req.user = user;

    if (user.role !== 0) {
      return res.status(403).json({ message: 'Access denied. Super Admin only.' });
    }
    return next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
