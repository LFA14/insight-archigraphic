// Importing necessary libraries and components
import { useState } from "react";  // useState hook to manage state
import { useNavigate } from "react-router-dom";  // useNavigate hook for page navigation
import { signUp } from "../services/UserService";  // Service to handle user registration
import { setToken } from "../utility/Utility";  // Utility function to store the token
import "../index.css";  // Importing custom CSS for styling

// Registration Component
const Registration = () => {
    const navigate = useNavigate();  // Hook to navigate to different pages
    const [formData, setFormData] = useState({  // State to hold registration form data
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");  // State to hold error messages

    // Handle change in input fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });  // Update form data state
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior

        // Validation checks for empty fields
        if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) {
            setError("All fields are required.");  // Display error message if fields are empty
            return;
        }

        try {
            // Sending the registration details to the backend
            const result = await signUp(
                formData.firstName,
                formData.lastName,
                formData.username,
                formData.password
            );

            // On success, store the token and redirect to home page
            setToken(result.data.token);  // Store the access token
            alert("Registration successful!");  // Display success message
            navigate("/home");  // Redirect to home page
        } catch (err) {
            // Handle error from the API call
            console.log(err);
            setError("Registration failed. Please try again.");  // Display error message if registration fails
        }
    };

    return (
        <div className="registration-container">
            {/* Logo */}
            <img src="https://i.ibb.co/sptKQsxL/logo-insight-01-01.png" alt="Logo" className="registration-logo" />

            {/* Registration Form */}
            <div className="registration-form-container">
                <h2 className="text-center text-light mb-4">Register</h2>

                {/* Display error message if there is an error */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Form to collect user information */}
                <form onSubmit={handleSubmit}>
                    {/* First Name Field */}
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Last Name Field */}
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Username Field */}
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Sign Up
                    </button>
                </form>

                {/* Login Redirect Link */}
                <p className="signup-text mt-3">
                    Already have an account?{" "}
                    <span className="signup-link" onClick={() => navigate("/")}>
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

// Exporting the Registration component for use in other parts of the application
export default Registration;
