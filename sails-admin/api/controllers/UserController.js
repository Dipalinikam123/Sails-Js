
module.exports = {
  getAllUser: async function (req, res) {
    try {
      const users = await User.find();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      // console.error('Failed to retrieve users:', error);
      return res.status(500).json({ message: 'Fail To Retrieve User', error });
    }
  },
  deleteUser: async function (req, res) {
    // console.log("---id", req.params.id)
    try {
      const id = req.params.id;

      const user = await User.findOne({ id });

      // console.log("----user", user)
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }

      const deletedUser = await User.destroyOne({ id });

      return res.status(200).json({ message: 'user successFully Deleted', deletedUser });
    } catch (error) {
      // console.log("----err", error);
      return res.status(500).json({ message: 'User Fail to delete', error });
    }
  },
  userProfile: async function (req, res) {
    // console.log('===req.params', req.params.id);
    const userId = req.params.id;
    // console.log('===id', userId);
    try {
      const user = await User.findOne({ id: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.view('pages/profile', {
        user: user,
      });
    } catch (error) {
      console.error('Failed to retrieve user profile:', error);
      return res.status(500).json({ message: 'Failed to get user profile', error });
    }
  },

  updateUser: async function (req, res) {
    const id = req.params.id; // Get the user ID from request parameters
    // console.log('---updateUser id', id);
    // console.log('----update req body', req.body);

    try {
      // Find the user by ID
      const user = await User.findOne({ id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const updatedUser = await User.updateOne({ id }).set(req.body);

      if (req.body.addedBy === 'superAdmin') {
        return res.redirect(`/enterpriselist/${updatedUser.enterpriseId}`);
      }

      else if (req.body.addedBy === 'admin') {
        return res.redirect(`/adminenterprise/${updatedUser.enterpriseId}`);
      }
      else {
        return res.redirect(`/userprofile/${id}`);
      }
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update', error });
    }
  },
  removeUser: async function (req, res) {
    // console.log('req.body remove user---', req.body);
    try {
      const { id: userId, enterpriseId } = req.body;
      // console.log('---remove user', userId, enterpriseId);

      // Update the user's role to 99
      await User.updateOne({ id: userId }).set({ role: 99 });

      if (addedBy = 'superAdmin') {
        return res.redirect(`/enterpriselist/${enterpriseId}`);
      }else if(  addedBy = 'admin'){
        return res.redirect(`/adminenterprise/${enterpriseId}`);
      }
      else{
        return res.redirect(`/userprofile/${id}`);
      }

    } catch (error) {
      console.error('Error removing user:', error);
      return res.serverError(error);
    }
  }
};
