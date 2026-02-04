import http from "../http-common";
import { getTokenBearer } from "../utility/Utility";

/*
-----------------------------------------------------------------------
  Purpose: Fetches all users from the system
  Returns: Axios promise containing an array of user objects
-----------------------------------------------------------------------
*/
export const getAll = () => {
  return http.get("/users", {
    headers: {
      Authorization: getTokenBearer(),
    },
  });
};

/*
-----------------------------------------------------------------------
  Purpose: Authenticates a user (login)
  Parameters:
    - username: string
    - password: string
  Returns: Axios promise containing token and user info
-----------------------------------------------------------------------
*/
export const authenticate = (username, password) => {
  return http.post("/auth/login", { username, password });
};

/*
-----------------------------------------------------------------------
  Purpose: Registers a new user
  Parameters:
    - username: string
    - firstName: string
    - lastName: string
    - password: string
  Returns: Axios promise containing new user data
-----------------------------------------------------------------------
*/
export const signUp = (username, firstName, lastName, password) => {
  return http.post("/auth/signup", { username, firstName, lastName, password });
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches a single user by ID
  Parameters:
    - userId: string - The ID of the user to retrieve
  Returns: User object on success
-----------------------------------------------------------------------
*/
export const getUserById = async (userId) => {
  try {
    const response = await http.get(`/users/${userId}`, {
      headers: {
        Authorization: getTokenBearer(),
      },
    });

    return response;
  } catch (error) {
    console.error(`Error in getUserById for ID ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};


/*
-----------------------------------------------------------------------
  Purpose: Updates a user's information
  Parameters:
    - userId: string - The ID of the user to update
    - userData: object - The updated user data
  Returns: Updated user object
-----------------------------------------------------------------------
*/
export const updateUser = async (userId, userData) => {
  try {
    const response = await http.patch(`/users/${userId}`, userData, {
      headers: {
        Authorization: getTokenBearer(),
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error in updateUser for ID ${userId}:`, error.response?.data || error.message);
  }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific user by ID
  Parameters: 
    - userId: string - The user ID to delete
  Returns: Nothing on success
-----------------------------------------------------------------------
*/
export const deleteUser = async (userId) => {
  try {
    await http.delete(`/users/${userId}`, {
      headers: {
        Authorization: getTokenBearer(),
      }
    });
  } catch (error) {
    console.error(`Error in deleteUser for ID ${userId}:`, error.response?.data || error.message);
  }
};

/*
-----------------------------------------------------------------------
  Purpose: Adds a new user to the system
  Parameters:
    - userData: object - The data for the new user to be created
  Returns: The created user object
-----------------------------------------------------------------------
*/
export const addUser = async (userData) => {
  try {
    const response = await http.post("/users", userData, {
      headers: {
        Authorization: getTokenBearer(),
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error in addUser:`, error.response?.data || error.message);
  }
};
