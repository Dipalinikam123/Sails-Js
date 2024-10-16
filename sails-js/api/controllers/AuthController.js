
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Ensure jwt is imported
const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key
const { FIELD_REQUIRE, USER_NOT_FOUND, INCORRECT_PASS, LOGIN_SUCCESS, LOGIN_FAIL } = require('../../utils/constant')

module.exports = {
  signup: async function (req, res) {
    try {
      const { email, password, age } = req.body;

      // Check if all required fields are present
      if (!email || !password || !age) {
        return res.status(400).json({ success: false, message: FIELD_REQUIRE });
      }

      // Hash the password
      const hash = await bcrypt.hash(password, 10);

      // Create the new user with hashed password
      const newUser = await User.create({
        email,
        password: hash,
        age,
      }).fetch();

      // Generate the token
      const token = jwt.sign({ _id: newUser.id, email: newUser.email }, secretKey);

      // Save the token to the user document and update the database
      newUser.token = token;
      await User.updateOne({ id: newUser.id }).set({ token });

      // Respond with the generated token
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  signin: async function (req, res) {
    try {
      // Check if the user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: USER_NOT_FOUND });
      }

      // Verify password
      const isAuth = bcrypt.compareSync(req.body.password, user.password);
      if (!isAuth) {
        return res.status(401).json({ message: INCORRECT_PASS });
      }

      // Generate a token upon successful authentication
      const token = jwt.sign({ email: req.body.email, _id: user.id }, secretKey);

      // Save the token to the user's record
      await User.updateOne({ id: user.id }).set({ token });

      // Respond with the token
      return res.status(200).json({ message: LOGIN_SUCCESS, token });
    } catch (error) {
      // console.error('Signin error:', error);
      return res.status(500).json({ message: LOGIN_FAIL, error });
    }
  },
}