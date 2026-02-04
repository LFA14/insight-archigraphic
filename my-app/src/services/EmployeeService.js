import http from "../http-common";
import { getTokenBearer } from "../utility/Utility";

/*
-----------------------------------------------------------------------
  Purpose: Fetches all employees from the system
  Returns: Axios promise containing an array of employee objects
-----------------------------------------------------------------------
*/
export const getAllEmployees = () => {
    return http.get("/employees", {
        headers: {
            Authorization: getTokenBearer(),
        },
    });
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches a single employee by ID
  Parameters:
    - employeeId: string - The ID of the employee to retrieve
  Returns: Employee object on success
-----------------------------------------------------------------------
*/
export const getEmployeeById = async (empID) => {
    try {
        const response = await http.get(`/employees/${empID}`, {
            headers: {
                Authorization: getTokenBearer(),
            },
        });

        return response;
    } catch (error) {
        console.error(`Error in getEmployeeById for ID ${empID}:`, error.response?.data || error.message);
        throw error;
    }
};


/*
-----------------------------------------------------------------------
  Purpose: Updates an employee's information
  Parameters:
    - employeeId: string - The ID of the employee to update
    - employeeData: object - The updated employee data
  Returns: Updated employee object
-----------------------------------------------------------------------
*/
export const updateEmployee = async (empID, employeeData) => {
    try {
        const response = await http.patch(`/employees/${empID}`, employeeData, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error in updateEmployee for ID ${empID}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific employee by ID
  Parameters: 
    - employeeId: string - The employee ID to delete
  Returns: Nothing on success
-----------------------------------------------------------------------
*/
export const deleteEmployee = async (empID) => {
    try {
        await http.delete(`/employees/${empID}`, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
    } catch (error) {
        console.error(`Error in deleteEmployee for ID ${empID}:`, error.response?.data || error.message);
    }
};
/*
-----------------------------------------------------------------------
  Purpose: Adds a new employee to the system
  Parameters:
    - employeeData: object - The data for the new employee to be created
  Returns: The created employee object
-----------------------------------------------------------------------
*/
export const createEmployee = async (employeeData) => {
    try {
        const response = await http.post("/employees", employeeData, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error in addEmployee:`, error.response?.data || error.message);
    }
};
