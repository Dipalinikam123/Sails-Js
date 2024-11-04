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
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
