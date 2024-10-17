// api/middlewares/isAuth.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key

module.exports = async function (req, res, next) {
  const token = req.params.id; // Get the token from the query parameter

  if (!token) {
    return res.redirect('/login');
  }

  try {
    // const decoded = jwt.verify(token, secretKey); // Verify the token
    // req.user = decoded; // Attach the decoded user information to the request object
    return  next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
