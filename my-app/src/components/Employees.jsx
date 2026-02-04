// Importing React core functionality
import { useEffect, useState } from "react";

// Importing useNavigate hook from react-router-dom for navigation
import { useNavigate } from "react-router-dom";
// Importing the services for employee data handling
import { getAllEmployees, deleteEmployee } from "../services/EmployeeService";

const Employees = () => {
    // State to store employee data
    const [employees, setEmployees] = useState([]);

    // useNavigate hook to navigate to different routes
    const navigate = useNavigate();

    // useEffect hook to fetch employees data when the component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Function to fetch employees from the server using the service function
    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees();  // Fetching employee data using the service function
            setEmployees(response?.data);
        } catch (e) {
            alert("Error fetching employees: " + e);
        }
    };

    // Function to handle employee deletion using the service function
    const handleDelete = async (id) => {
        // Confirmation dialog to ensure deletion
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                // Calling the service function to delete the employee
                await deleteEmployee(id);
                // Updating the state by removing the deleted employee from the list
                setEmployees(employees.filter(employee => employee.empID !== id));
                alert("Employee deleted successfully!");
            } catch (e) {
                // If there is an error while deleting, show an alert
                alert("Error deleting employee: " + e);
            }
        }
    };

    return (
        <div className="container">
            {/* Header with navigation and actions */}
            <div className="header-actions">
                {/* Back button to navigate to the admin page */}
                <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
                    ← Back
                </button>
                {/* Title of the page */}
                <h2 className="text-center mb-0">Employees</h2>
                {/* Button to navigate to the "Add Employee" page */}
                <button className="btn btn-success" onClick={() => navigate("/add-employee")}>
                    + Add Employee
                </button>
            </div>

            {/* Employees Table */}
            <div className="table-responsive">
                <table className="table table-bordered table-light">
                    <thead>
                        <tr>
                            {/* Table headers */}
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Salary</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping over employees and rendering each one in a table row */}
                        {employees.map((employee) => (
                            <tr key={employee.empID}>
                                <td>{employee?.empID}</td>
                                <td>{employee?.empName}</td>
                                <td>{employee?.empPhone}</td>
                                <td>{employee?.empEmail}</td>
                                <td>{employee?.empRole}</td>
                                <td>${employee?.empSalary}</td>
                                {/* Actions column with buttons for editing and deleting an employee */}
                                <td className="text-end">
                                    {/* Button to navigate to the edit employee page */}
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/edit-employee/${employee.empID}`)}>
                                        Edit
                                    </button>
                                    {/* Button to delete an employee */}
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.empID)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Exporting the Employees component as default for use in routing or rendering elsewhere
export default Employees;
