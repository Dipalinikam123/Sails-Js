const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key


// api/middlewares/isAuthenticated.js
module.exports = async function (req, res, next) {
  // console.log('-policy token---', req.session.token);
  if (!req.cookies.authToken) {
    return res.status(401).redirect('/login');
  }

  try {
    // Optionally verify the token if you want to validate it
    const decoded = jwt.verify(req.cookies.authToken, secretKey);
    const userId = decoded._id;
    const user = await User.findOne({ id:userId });
    req.user = user;
    // console.log('-policy user---', req.user);
    return next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
