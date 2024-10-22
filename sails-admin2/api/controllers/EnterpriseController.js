// api/controllers/InterpriceController.js
module.exports = {
  createEnterprise: async function (req, res) {
    try {
      const { name, logo, employeeCount, manager } = req.body;

      // Validate required fields
      if (!name || !employeeCount || !manager) {
        return res
          .status(400)
          .json({ success: false, message: 'All fields are required.' });
      }

      // Create the new Interprice record
      const newEnterprise = await Enterprise.create({
        name,
        logo,
        employeeCount,
        manager,
      }).fetch();

      // Respond with the created record
      // return res.status(201).json({ success: true, data: newEnterprise });
      return res.redirect('/enterpriselist');
    } catch (error) {
      console.log('error', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  getEnterprise: async function (req, res) {
    try {
      // Fetch all Interprice from the database
      const enterprise = await Enterprise.find();
      return res.status(200).json({ success: true, enterprise });
    } catch (error) {
      // console.error('Failed to retrieve Interprice:', error);
      return res
        .status(500)
        .json({ message: 'fail to retrive interprise', error });
    }
  },
  getAdminEnterprise: async function (req, res) {
    const enterpriseId = req.params.id;
    // console.log('-----', enterpriseId);
    try {
      const enterprise = await Enterprise.findOne({ id: enterpriseId });
      const user = await User.find({ enterpriseId, role: { '!=': 99 } });
      if (!enterprise) {
        return res.status(404).json({ message: 'Enterprise not found' });
      }
      return res.view('pages/adminEnterprise', {
        enterprise: enterprise,
        user: user,
      });
    } catch (error) {
      console.error('Failed to retrieve enterprise:', error);
      return res
        .status(500)
        .json({ message: 'Failed to retrieve enterprise', error });
    }
  },
  getEnterpriseList: async function (req, res) {
    try {
      // Fetch all Interprice from the database
      const enterprise = await Enterprise.find({role: { '!=': 99 }});
      return res.view('pages/enterpriseList', {
        enterprise: enterprise,
      });
    } catch (error) {
      // console.error('Failed to retrieve Interprice:', error);
      return res
        .status(500)
        .json({ message: 'fail to retrive interprise', error });
    }
  },
  getEnterpriseDetail: async function (req, res) {
    const enterpriseId = req.params.id;
    // console.log('----Enterprise ID detail:', enterpriseId);

    try {
      const enterpriseUsers = await User.find({
        enterpriseId,
        role: { '!=': 99 },
      });

      return res.view('pages/enterpriseDetails', {
        user: enterpriseUsers,
        enterpriseId: enterpriseId,
      });
    } catch (error) {
      console.error('Failed to retrieve users for enterprise:', error);
      return res
        .status(500)
        .json({ message: 'Failed to retrieve enterprise users', error });
    }
  },
  updateEnterprise: async function (req, res) {
    const id = req.params.id; // Get the user ID from request parameters
    console.log('----id', id);
    try {
      // Find the user by ID
      const enterprise = await Enterprise.findOne({ id });
      if (!enterprise) {
        return res.status(404).json({ message: 'User not found' });
      }

      await Enterprise.updateOne({ id }).set(req.body);

      return res.redirect(`/enterpriselist`);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update', error });
    }
  },
  removeEnterprise: async function (req, res) {
    const enterpriseId = req.params.id;
    console.log('-----enterprise id controller', enterpriseId);
    console.log('-----enterprise req controller', req.body);

    try {
      const newRole = req.body.role;

      // Update the enterprise's role to 99
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