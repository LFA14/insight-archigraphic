// Importing necessary hooks from React
import { useState } from "react";
// Importing useNavigate from react-router-dom for navigation
import { useNavigate } from "react-router-dom";
// Importing addUser service function to add a user
import { addUser } from "../../services/UserService";

// AddUser Component
// This component allows the admin to add a new user by filling out a form and submitting the details.

const AddUser = () => {
    const navigate = useNavigate();  // Hook for navigation to different routes
    const [user, setUser] = useState({
        username: "",   // User's username
        firstName: "",  // User's first name
        lastName: "",   // User's last name
        role: "",       // User's role in the system
        password: "",   // User's password
    });

    // Handle input changes and update user state
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });  // Update the corresponding user field
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        try {
            // Use service function to send POST request to add the user to the server
            await addUser(user);
            alert("User added successfully!");  // Notify user of successful addition
            navigate("/users");  // Navigate to the users page after successful submission
        } catch (error) {
            alert("Error adding user: " + error);  // Notify user of an error if the POST request fails
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Add User</h2>

            {/* User form to collect user information */}
            <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={handleChange}
                        value={user.username}
                        required  // Required field validation
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        onChange={handleChange}
                        value={user.firstName}
                        required  // Required field validation
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        onChange={handleChange}
                        value={user.lastName}
                        required  // Required field validation
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        name="role"
                        onChange={handleChange}
                        value={user.role}
                        required  // Required field validation
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Visitor">Visitor</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                        value={user.password}
                        required  // Required field validation
                    />
                </div>

                {/* Buttons for submitting the form or cancelling the action */}
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Cancel  {/* Button to cancel and navigate back */}
                    </button>
                    <button type="submit" className="btn btn-success">
                        Add User  {/* Button to submit the form */}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Exporting the AddUser component to be used in other parts of the application
export default AddUser;
