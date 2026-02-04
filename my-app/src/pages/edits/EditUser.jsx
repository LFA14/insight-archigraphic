// Importing necessary React hooks and libraries
import { useEffect, useState } from "react";  // useState for state management, useEffect for side effects
import { useNavigate, useParams } from "react-router-dom";  // useNavigate for navigation, useParams for URL parameters
import { getUserById, updateUser } from "../../services/UserService"; // Importing the service functions

// EditUser Component
// This component allows the admin to edit the details of an existing user.
const EditUser = () => {
    const { id } = useParams();  // Extracting user ID from the URL parameters
    const navigate = useNavigate();  // Hook to navigate between pages
    const [user, setUser] = useState({
        userID: "",
        username: "",
        firstName: "",
        lastName: "",
        role: ""
    });

    // useEffect to fetch the user details when the component loads
    useEffect(() => {
        fetchUserDetails();
    }, []);  // Empty dependency array ensures this runs once on component mount

    // Function to fetch user details based on the user ID
    const fetchUserDetails = async () => {
        try {
            const response = await getUserById(id);  // Fetch user data using the service function
            setUser(response.data);  // Update the state with the fetched data
        } catch (error) {
            alert("Error fetching user details: " + error);  // Alert if there is an error fetching the user details
        }
    };

    // Handling change in input fields
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });  // Update the state with the new value of the input field
    };

    // Function to handle the form submission and update the user details
    const handleUpdate = async (e) => {
        e.preventDefault();  // Prevent form's default submit behavior
        try {
            await updateUser(id, user);  // Call the service function to update the user
            alert("User updated successfully!");  // Alert the user about the successful update
            navigate(-1);  // Navigate back to the previous page
        } catch (error) {
            alert("Error updating user: " + error);  // Alert if there is an error while updating the user
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Edit User</h2>

            {/* Form for editing user details */}
            <form onSubmit={handleUpdate} className="p-3 border rounded bg-light">
                {/* Displaying User ID */}
                <div className="mb-3">
                    <label className="form-label">User ID</label>
                    <input type="text" className="form-control" value={user.userID} disabled />
                </div>

                {/* Username input field */}
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* First Name input field */}
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Last Name input field */}
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Role input field as dropdown */}
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Visitor">Visitor</option>
                    </select>
                </div>

                {/* Buttons for saving or canceling the changes */}
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

// Exporting EditUser component for use in other parts of the application
export default EditUser;
