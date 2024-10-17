const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key


// api/middlewares/isAuthenticated.js
module.exports = async function (req, res, next) {
  if (!req.session.token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Optionally verify the token if you want to validate it
    const decoded = jwt.verify(req.session.token, secretKey);
    req.user = decoded; // Attach user info to request object

    console.log('---req.user',req.user);
    return next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
