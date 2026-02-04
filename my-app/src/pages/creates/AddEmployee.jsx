// Importing necessary hooks from React
import { useState } from "react";
// Importing useNavigate from react-router-dom for navigation
import { useNavigate } from "react-router-dom";
// Importing employee service
import { createEmployee } from "../../services/EmployeeService";

// AddEmployee Component
// This component allows the admin to add a new employee by filling out a form and submitting the details.

const AddEmployee = () => {
    const navigate = useNavigate();  // Hook for navigation to different routes
    const [employee, setEmployee] = useState({
        empName: "",    // Employee's name
        empPhone: "",   // Employee's phone number
        empEmail: "",   // Employee's email
        empRole: "",    // Employee's role in the company
        empSalary: "",  // Employee's salary
    });

    // Handle input changes and update employee state
    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });  // Update the corresponding employee field
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        try {
            await createEmployee(employee);  // Use service function to add employee
            alert("Employee added successfully!");  // Notify user of successful addition
            navigate("/employees");  // Navigate to the employees page after successful submission
        } catch (error) {
            alert("Error adding employee: " + error);  // Notify user of an error if the request fails
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Add Employee</h2>

            {/* Employee form to collect employee information */}
            <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="empName"
                        onChange={handleChange}
                        required  // Required field validation
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="empPhone"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="empEmail"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input
                        type="text"
                        className="form-control"
                        name="empRole"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input
                        type="number"
                        className="form-control"
                        name="empSalary"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Buttons for submitting the form or cancelling the action */}
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
