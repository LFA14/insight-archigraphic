import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, deleteUser } from "../services/UserService";

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAll();
            setUsers(response?.data);
        } catch (e) {
            alert("Error fetching users: " + e);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                setUsers(users.filter((user) => user.userID !== id));
                alert("User deleted successfully!");
            } catch (e) {
                alert("Error deleting user: " + e);
            }
        }
    };

    return (
        <div className="container">
            {/* Back Button & Page Title */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
                    ← Back
                </button>
                <h2 className="text-center users-title">Users</h2>
                <button className="btn btn-success" onClick={() => navigate("/add-user")}>
                    + Add User
                </button>
            </div>

            {/* Users Table */}
            <div className="table-responsive">
                <table className="table table-bordered table-light">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userID}>
                                <td>{user?.userID}</td>
                                <td>{user?.username}</td>
                                <td>{user?.firstName}</td>
                                <td>{user?.lastName}</td>
                                <td>{user?.role}</td>
                                <td className="text-end">
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/edit-user/${user.userID}`)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.userID)}>
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

export default Users;
