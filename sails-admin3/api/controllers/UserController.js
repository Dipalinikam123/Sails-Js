const bcrypt = require('bcrypt');
module.exports = {
  getAllUser: async function (req, res) {
    try {
      const users = await User.find();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ message: 'Fail To Retrieve User', error });
    }
  },
  addUser: async function (req, res) {
    try {
      const { name, email, password, role, enterpriseId } = req.body;

      if (!name || !email || !password || !enterpriseId) {
        return res
          .status(400)
          .json({ success: false, message: 'Fields are required.' });
      }

      if (role === '0') {
        const existingSuperAdmin = await User.findOne({ role: 0 });
        if (existingSuperAdmin > 0) {
          return res.status(400).json({ success: false, message: 'SuperAdmin already exists.' });
        }
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: 'Email already in use.' });
      }

      const hash = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hash,
        role,
        enterpriseId,
      }).fetch();
      return res.status(201).json({ success: true, message: 'User added successfully.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getUserByToken: async function (req, res) {
    try {
      const user = req.user;

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.json({ user });
    } catch (err) {
      return res.status(500).json({ error: 'Server error.' });
    }
  },

  userProfile: async function (req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findOne({ id: userId });
      const enterprise = await Enterprise.findOne({ id: user.enterpriseId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.view('pages/profile', {
        user: user,
        enterprise: enterprise,
      });
    } catch (error) {
      console.error('Failed to retrieve user profile:', error);
      return res.status(500).json({ message: 'Failed to get user profile', error });
    }
  },

  updateUser: async function (req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({ id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await User.updateOne({ id }).set(req.body);

      if (req.body.addedBy === 'superAdmin') {
        return res.redirect(`/enterpriselist/${user.enterpriseId}`);
      } else if (req.body.addedBy === 'admin') {
        return res.redirect(`/adminenterprise/${user.enterpriseId}`);
      } else {
        return res.redirect(`/userprofile/${id}`);
      }
    } catch (error) {
      console.error('Update user error:', error);
      return res.status(500).json({ message: 'Failed to update', error });
    }
  },

  removeUser: async function (req, res) {
    try {
      const { id: userId } = req.body;

      await User.updateOne({ id: userId }).set({ role: 99 });

      return res.status(200).json({ message: 'Remove User successfully' });
    } catch (error) {
      console.error('Error removing user:', error);
      return res.serverError(error);
    }
  },
};
