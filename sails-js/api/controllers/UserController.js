
const { USER_NOT_FOUND, FAIL_RETRIEVE_USER, FAIL_TO_GET_USER, FAIL_UPADATE, UPDATE_SUCCESS, DELETE_SUCCESS, FAIL_DELETE } = require('../../utils/constant')
module.exports = {
    getAllUser: async function (req, res) {
        try {
            // Fetch all users from the database
            const users = await User.find();
            return res.status(200).json({ success: true, users });
        } catch (error) {
            // console.error('Failed to retrieve users:', error);
            return res.status(500).json({ message: FAIL_RETRIEVE_USER, error });
        }
    },

    getUser: async function (req, res) {
        try {
            const id = req.params.id; // Get the user ID from request parameters
            const user = await User.findOne({ id }); // Use findOne instead of findById

            if (!user) {
                return res.status(404).json({ message: USER_NOT_FOUND }); // Use 404 for not found
            }

            return res.status(200).json(user);
        } catch (error) {
            // console.error('Error retrieving user:', error);
            return res.status(500).json({ message: FAIL_TO_GET_USER, error });
        }
    },

    updateUser: async function (req, res) {
        try {
            const id = req.params.id;

            // Find the user by ID
            const user = await User.findOne({ id }); // Use `id` instead of `_id`

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: USER_NOT_FOUND });
            }

            // Update the user's properties with the request body
            const updatedUser = await User.updateOne({ id }).set(req.body);

            // Return the updated user
            return res.status(200).json({ message: UPDATE_SUCCESS, updatedUser });
        } catch (error) {
            return res.status(500).json({ message: FAIL_UPADATE, error });
        }
    },


    deleteUser: async function (req, res) {
        // console.log("---id", req.params.id)
        try {
            const id = req.params.id;

            // Find the user by ID
            const user = await User.findOne({ id }); // Use `id` instead of `_id`

            // console.log("----user", user)
            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: USER_NOT_FOUND });
            }

            // Delete the user
            const deletedUser = await User.destroyOne({ id }) // Use `destroyOne` to delete the user

            // Return a success message
            return res.status(200).json({ message: DELETE_SUCCESS, deletedUser });
        } catch (error) {
            // console.log("----err", error);
            return res.status(500).json({ message: FAIL_DELETE, error });
        }
    }

}
