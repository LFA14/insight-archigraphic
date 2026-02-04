import { Navigate, Outlet } from "react-router-dom";

// Mock function to check user authentication and role
const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Fetch user from local storage
    return user ? user.role : null; // Return user role if logged in, otherwise null
};

const PrivateRoute = ({ allowedRoles }) => {
    const userRole = getUserRole(); // Get user role

    // If no role or not allowed, redirect to login
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render the protected routes
};

export default PrivateRoute;
