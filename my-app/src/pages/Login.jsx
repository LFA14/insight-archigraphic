// Importing necessary libraries and components
import { useState } from "react";  // useState hook to manage state
import { Form, Button, Container } from "react-bootstrap";  // React-Bootstrap components for UI
import { authenticate } from "../services/UserService";  // Service to authenticate the user
import { setRole, setToken } from "../utility/Utility";  // Utility functions to store the role and token
import { useNavigate } from "react-router-dom";  // useNavigate hook to navigate between pages
import "../index.css";  // Importing custom CSS for styling

// Login Component
const Login = () => {
    const navigate = useNavigate();  // Hook to navigate to different pages
    const [user, setUser] = useState({  // State to hold username and password
        username: '',
        password: ''
    });

    // Handle change in input fields
    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });  // Update user state
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();  // Prevent the default form submission behavior

            // Check if username or password is empty
            if (user.username === '' || user.password === '') {
                alert('Username/password cannot be empty.');  // Alert user if fields are empty
                return;
            }

            // Send authentication request to the backend
            const response = await authenticate(user.username, user.password);
            const data = response?.data;

            // Set token and role from the response data
            setToken(data?.access_token);  // Store the access token
            setRole(data?.user?.role);  // Store the role of the user

            // Redirect user to appropriate page based on their role
            navigate(data?.user?.role === "Admin" ? "/admin" : "/home");

        } catch (e) {
            alert('Incorrect username or password.');  // Alert user if authentication fails
        }
    };

    return (
        <div className="login-container">
            {/* Logo */}
            <img src="https://i.ibb.co/sptKQsxL/logo-insight-01-01.png" alt="Logo" className="login-logo" />

            {/* Login Form */}
            <Container className="login-form-container">
                <Form onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="white-textbox"  // Custom styling for the textbox
                        />
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="white-textbox"  // Custom styling for the textbox
                        />
                    </Form.Group>

                    {/* Signup Text */}
                    <p className="signup-text">
                        Don't have an account?{" "}
                        <span className="signup-link" onClick={() => navigate("/signup")}>
                            Create one
                        </span>
                    </p>

                    {/* Submit Button */}
                    <Button variant="primary" type="submit" className="submit-btn">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

// Exporting the Login component for use in other parts of the application
export default Login;
