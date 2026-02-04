// Retrieve the stored access token from localStorage, or return an empty string if not found
export const getToken = () => localStorage.getItem("access_token") || "";

// Store the access token in localStorage if provided, otherwise remove it
export const setToken = (token) => {
    if (token) {
        localStorage.setItem("access_token", token);
    } else {
        localStorage.removeItem("access_token");
    }
};

// Remove the access token from localStorage
export const removeToken = () => {
    localStorage.removeItem("access_token");
};

// Return the access token in "Bearer" format for authorization headers
export const getTokenBearer = () => {
    const token = getToken();
    return token ? `Bearer ${token}` : "";
};

// Retrieve the stored user role from localStorage, or return an empty string if not found
export const getRole = () => localStorage.getItem("userRole") || "";

// Store the user role in localStorage if provided, otherwise remove it
export const setRole = (role) => {
    if (role) {
        localStorage.setItem("userRole", role)
    } else {
        localStorage.removeItem("userRole")
    }
}
