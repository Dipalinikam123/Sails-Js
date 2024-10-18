// In your controller

module.exports = {
  dashboard: async function (req, res) {
    // console.log('----dashboard user',req.user);
    // console.log('----dashboard  req.session.token', req.session.token);
    try {
      // Ensure the user is authenticated and has a session
      if (!req.user) {
        return res.redirect('/login');
      }

      // Fetch the user from the session
      const user = req.user; // or however you're storing the user in session
      const token = req.session.token; // Access the token if stored in session

      return res.view('pages/dashboard', { user, token }); // Pass user and token to the view
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred', error });
    }
  }
};
