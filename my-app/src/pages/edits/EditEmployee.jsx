// Importing necessary React hooks and libraries
import { useEffect, useState } from "react";  // useState for state management, useEffect for side effects
import { useNavigate, useParams } from "react-router-dom";  // useNavigate for navigation, useParams for URL parameters
import { updateEmployee, getEmployeeById } from "../../services/EmployeeService"; // Importing the service functions

// EditEmployee Component
// This component allows the admin to edit the details of an existing employee.
const EditEmployee = () => {
    const { id } = useParams();  // Extracting employee ID from the URL parameters
    const navigate = useNavigate();  // Hook to navigate between pages
    const [employee, setEmployee] = useState({
        empID: "",
        empName: "",
        empPhone: "",
        empEmail: "",
        empRole: "",
        empSalary: ""
    });

    // useEffect to fetch the employee details when the component loads
    useEffect(() => {
        fetchEmployeeDetails();
    }, []);  // Empty dependency array ensures this runs once on component mount

    // Function to fetch employee details based on the employee ID
    const fetchEmployeeDetails = async () => {
        try {
            const response = await getEmployeeById(id);  // Fetch employee data using the service function
            setEmployee(response.data);  // Update the state with the fetched data
        } catch (error) {
            alert("Error fetching employee details: " + error);  // Alert if there is an error fetching the employee details
        }
    };

    // Handling change in input fields
    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });  // Update the state with the new value of the input field
    };

    // Function to handle the form submission and update the employee details
    const handleUpdate = async (e) => {
        e.preventDefault();  // Prevent form's default submit behavior
        try {
            await updateEmployee(id, employee);  // Call the service function to update the employee
            alert("Employee updated successfully!");  // Alert the user about the successful update
            navigate(-1);  // Navigate back to the previous page
        } catch (error) {
            alert("Error updating employee: " + error);  // Alert if there is an error while updating the employee
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Edit Employee</h2>

            {/* Form for editing employee details */}
            <form onSubmit={handleUpdate} className="p-3 border rounded bg-light">
                {/* Displaying Employee ID */}
                <div className="mb-3">
                    <label className="form-label">Employee ID</label>
                    <input type="text" className="form-control" value={employee.empID} disabled />
                </div>

                {/* Employee Name input field */}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="empName"
                        value={employee.empName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Employee Phone input field */}
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="empPhone"
                        value={employee.empPhone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Employee Email input field */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="empEmail"
                        value={employee.empEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Employee Role input field */}
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input
                        type="text"
                        className="form-control"
                        name="empRole"
                        value={employee.empRole}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Employee Salary input field */}
                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input
                        type="number"
                        className="form-control"
                        name="empSalary"
                        value={employee.empSalary}
                        onChange={handleChange}
                        required
                    />
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

// Exporting EditEmployee component for use in other parts of the application
export default EditEmployee;
