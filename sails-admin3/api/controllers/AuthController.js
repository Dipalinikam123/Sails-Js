const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;


module.exports = {
  signin: async function (req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || user.role===99) {
        return res.status(401).json({ error: 'User Not Found' });
      }

      const isAuth = bcrypt.compareSync(req.body.password, user.password);
      if (!isAuth) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      const token = jwt.sign({ email: req.body.email, _id: user.id }, secretKey);
      user.token = token;
      res.cookie('authToken', token, { httpOnly: false, secure: true });
      await User.updateOne({ id: user.id }).set({ token });
      return res.status(200).json({ message: 'Login successful.' });

    } catch (error) {
      return res.status(500).json({ message: 'login fail', error });
    }
  },
};

