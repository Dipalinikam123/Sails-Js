const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key
const { TOKEN_MISSING, INVALID_TOKEN } = require('../../utils/constant')
module.exports = async function (req, res, next) {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.json({ message: TOKEN_MISSING });
    }

    const decoded = jwt.verify(token, secretKey);
    // console.log('---DECODED', decoded);
    req.id = decoded._id; // Set userId from the decoded token to session
    // console.log("---req.id", req.id)
    return next();
  } catch (err) {
    // console.error('JWT verification failed:', err);
    return res.json({ message: INVALID_TOKEN });
  }
};
