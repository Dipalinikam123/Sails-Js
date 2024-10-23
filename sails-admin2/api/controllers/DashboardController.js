// // In your controller

// module.exports = {
//   dashboard: async function (req, res) {
//     // console.log('----dashboard user',req.user);
//     // console.log('----dashboard  req.cookies.authToken', req.cookies.authToken);
//     try {
//       // Ensure the user is authenticated and has a session
//       if (!req.user) {
//         return res.redirect('/login');
//       }

//       // Fetch the user from the session
//       const user = req.user; // or however you're storing the user in session
//       // const token = req.cookies.authToken; // Access the token if stored in session

//       return res.view('pages/dashboard', { user }); // Pass user and token to the view
//     } catch (error) {
//       return res.status(500).json({ message: 'An error occurred', error });
//     }
//   }
// };
