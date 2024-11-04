module.exports = {
  createEnterprise: async function (req, res) {
    try {
      const { name, logo, manager } = req.body;
      console.log('---manager', manager);

      if (!name || !logo || !manager) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }

      await Enterprise.create({
        name,
        logo,
        manager,
      }).fetch();

      return res.status(201).json({ success: true, message: 'EnterPrise Create Successfully' });
    } catch (error) {
      console.log('error', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  getAdminEnterprise: async function (req, res) {
    const enterpriseId = req.params.id;
    const loginUser = req.user;
    try {
      const enterprise = await Enterprise.findOne({ id: enterpriseId });

      if (!enterprise) {
        return res.status(404).json({ message: 'Enterprise not found' });
      }
      const employeeCount = await User.count({ enterpriseId: enterpriseId, role: { '!=': 99 } });

      const users = await User.find({ enterpriseId, role: { '!=': 99 } });

      enterprise.employeeCount = employeeCount;
      await Enterprise.updateOne({ id: enterpriseId }).set({ employeeCount: employeeCount });

      return res.view('pages/adminEnterprise', {
        enterprise: enterprise,
        user: users,
        loginUser: loginUser
      });
    } catch (error) {
      console.error('Failed to retrieve enterprise:', error);
      return res.status(500).json({ message: 'Failed to retrieve enterprise', error });
    }
  },

  getEnterpriseList: async function (req, res) {
    try {
      let enterprises = await Enterprise.find({ role: { '!=': 99 } });

      enterprises = await Promise.all(enterprises.map(async (e) => {
        const count = await User.count({ enterpriseId: e.id, role: { '!=': 99 } });
        await Enterprise.updateOne({ id: e.id }).set({ employeeCount: count });
        e.employeeCount = count;
        return e;
      }));

      return res.view('pages/enterpriseList', {
        enterprise: enterprises,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to retrieve enterprises', error });
    }
  },

  getEnterpriseDetail: async function (req, res) {
    const enterpriseId = req.params.id;
    const loginUser = req.user;

    try {
      const enterpriseUsers = await User.find({
        enterpriseId,
        role: { '!=': 99 },
      });
      const enterpriseDetail = await Enterprise.find({ id: enterpriseId });

      return res.view('pages/enterpriseDetails', {
        user: enterpriseUsers,
        enterprise: enterpriseDetail,
        loginUser: loginUser,
      });
    } catch (error) {
      console.error('Failed to retrieve users for enterprise:', error);
      return res
        .status(500)
        .json({ message: 'Failed to retrieve enterprise users', error });
    }
  },
  updateEnterprise: async function (req, res) {
    try {
      const id = req.params.id;
      const { name, logo, email, managerName, managerDepartment } = req.body;

      const enterprise = await Enterprise.findOne({ id });
      if (!enterprise) {
        return res.status(404).json({ message: 'Enterprise not found' });
      }

      await Enterprise.updateOne({ id }).set({
        name,
        logo,
        manager: {
          email,
          name: managerName,
          department: managerDepartment
        },
      });

      return res.redirect('/enterpriselist');
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update enterprise', error });
    }
  },

  removeEnterprise: async function (req, res) {
    const enterpriseId = req.params.id;
    try {
      const newRole = req.body.role;
      const upen = await Enterprise.updateOne({ id: enterpriseId }).set({
        role: newRole,
      });
      console.log('🚀 ~ upen:', upen);

      return res.redirect('/enterpriselist');
    } catch (error) {
      return res.serverError(error);
    }
  },
};
