
module.exports = {
  // signup: async function (req, res) {
  //   try {
  //     const { name, email, password, role, enterpriseId } = req.body;

  //     // Check if all required fields are present
  //     if (!name || !email || !password || !role || !enterpriseId) {
  //       return res.status(400).json({ success: false, message: 'Fields are require' });
  //     }

  //     const hash = await bcrypt.hash(password, 10);

  //     const newUser = await User.create({
  //       name,
  //       email,
  //       password: hash,
  //       role,
  //       enterpriseId,
  //     }).fetch();
  //     const token = jwt.sign({ _id: newUser.id, email: newUser.email }, secretKey);

  //     newUser.token = token;
  //     await User.updateOne({ id: newUser.id }).set({ token });

  //     // res.status(201).json({ success: true, token });
  //     return res.redirect('/dashboard');

  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // },
  // register: async function (req, res) {
  //   try {
  //     const enterprise = await Enterprise.find().select(['id', 'name']);
  //     return res.view('pages/register', {
  //       enterprise: enterprise,
  //     });
  //   } catch (error) {
  //     // console.error('Failed to retrieve users:', error);
  //     return res.status(500).json({ message: 'Fail To get enterprise', error });
  //   }
  // },
  // signin: async function (req, res) {
  //   try {
  //     // Check if the user exists
  //     const user = await User.findOne({ email: req.body.email });
  //     if (!user) {
  //       return res.status(401).json({ message: USER_NOT_FOUND });
  //     }

  //     // Verify password
  //     const isAuth = bcrypt.compareSync(req.body.password, user.password);
  //     if (!isAuth) {
  //       return res.status(401).json({ message:'incorrect password' });
  //     }

  //     // Generate a token upon successful authentication
  //     const token = jwt.sign({ email: req.body.email, _id: user.id }, secretKey);

  //     // Save the token to the user's record
  //     await User.updateOne({ id: user.id }).set({ token });

  //     // Respond with the token
  //     return res.status(200).json({ message: 'login successfull', token });
  //   } catch (error) {
  //     // console.error('Signin error:', error);
  //     return res.status(500).json({ message: 'login fail', error });
  //   }
  // },

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

      const user = await User.findOne({ id }); // Use `id` instead of `_id`

      // console.log("----user", user)
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }

      const deletedUser = await User.destroyOne({ id });// Use `destroyOne` to delete the user

      return res.status(200).json({ message: 'user successFully Deleted', deletedUser });
    } catch (error) {
      // console.log("----err", error);
      return res.status(500).json({ message: 'User Fail to delete', error });
    }
  },
  userProfile: async function (req, res) {
    console.log('===req.params',req.query.id);
    const userId = req.query.id;
    // console.log('===id', userId);
    try {
      const user = await User.findOne({ id: userId }); // Use `id` instead of `userId`

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Render the profile view with the user data
      return res.view('pages/profile', {
        user: user,
      });
    } catch (error) {
      console.error('Failed to retrieve user profile:', error);
      return res.status(500).json({ message: 'Failed to get user profile', error });
    }
  },
};

