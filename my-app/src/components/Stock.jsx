// Importing necessary hooks from React
import { useEffect, useState } from "react";
// Importing navigation hook from react-router-dom
import { useNavigate } from "react-router-dom";

// Importing the stock service functions
import {
    getAllStock,
    deleteStock
} from "../services/StockService";

// Functional Component: Stock
// Purpose: Fetch, display, and manage stock items (view, delete, navigate to edit or add stock)
const Stock = () => {
    // State to hold the list of stock items
    const [stockItems, setStockItems] = useState([]);
    // Using useNavigate hook to navigate programmatically
    const navigate = useNavigate();

    // useEffect hook to fetch stock items when the component mounts
    useEffect(() => {
        fetchStock();
    }, []);

    // Function to fetch stock items from the server
    const fetchStock = async () => {
        try {
            const response = await getAllStock(); // Call service
            setStockItems(response.data); // Set fetched data in state
        } catch (e) {
            alert("Error fetching stock: " + e);
        }
    };

    // Function to handle the deletion of a stock item
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this stock item?")) {
            try {
                await deleteStock(id); // Call service
                setStockItems(stockItems.filter((stock) => stock.stockID !== id));
                alert("Stock item deleted successfully!");
            } catch (e) {
                alert("Error deleting stock item: " + e);
            }
        }
    };

    return (
        <div className="container">
            {/* Top button row for navigation and actions */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
                    ← Back
                </button>
                <h2 className="text-center flex-grow-1">Stock</h2>
                <button className="btn btn-success" onClick={() => navigate("/add-stock")}>
                    + Add Stock
                </button>
            </div>

            {/* Table to display the stock items */}
            <div className="table-responsive">
                <table className="table table-bordered table-light">
                    <thead>
                        <tr>
                            <th>Stock ID</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Quantity</th>
                            <th>Restock Threshold</th>
                            <th>Bought From</th>
                            <th>Bought For</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockItems.map((stock) => (
                            <tr key={stock.stockID}>
                                <td>{stock?.stockID}</td>
                                <td>{stock?.product?.productID}</td>
                                <td>{stock?.product?.productName}</td>
                                <td>{stock?.product?.productDesc}</td>
                                <td>{stock?.quantity}</td>
                                <td>{stock?.restockThreshold}</td>
                                <td>{stock?.boughtFrom}</td>
                                <td>{stock?.boughtFor}</td>
                                <td className="text-end">
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/edit-stock/${stock.stockID}`)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(stock.stockID)}>
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

export default Stock;
