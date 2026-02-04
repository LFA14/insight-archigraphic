// Import necessary hooks and components for functionality and UI
import { useEffect, useState } from "react";  // useState and useEffect for state management and side effects
import { useNavigate, useParams } from "react-router-dom";  // useNavigate for navigation, useParams for URL parameters
import { getStockById, updateStock } from "../../services/StockService";
// EditStock Component
// This component allows the admin to edit the details of an existing stock entry.
const EditStock = () => {
    const { id } = useParams();  // Extracting stock ID from the URL parameters
    const navigate = useNavigate();  // Hook to navigate between pages

    // State to hold the stock data
    const [stock, setStock] = useState({
        stockID: "",
        quantity: "",
        restockThreshold: "",
        boughtFrom: "",
        boughtFor: ""
    });

    // Fetch stock details on component mount
    useEffect(() => {
        fetchStockDetails();
    }, []);

    // Function to fetch stock details based on ID
    const fetchStockDetails = async () => {
        try {
            const response = await getStockById(id);

            setStock(response.data);

        } catch (error) {
            console.error("Error fetching stock details:", error);
            alert("Error fetching stock details: " + error.message);
        }
    };

    // Handle changes in form inputs
    const handleChange = (e) => {
        setStock({ ...stock, [e.target.name]: e.target.value });
    };

    // Handle form submission to update stock
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateStock(id, stock);  // Call the service to update stock
            alert("Stock updated successfully!");
            navigate(-1);  // Go back to the previous page
        } catch (error) {
            alert("Error updating stock: " + error.message);
        }
    };

    return (
        <div className="container mt-4">
            {/* Title */}
            <h2 className="text-center">Edit Stock</h2>

            {/* Stock Edit Form */}
            <form onSubmit={handleUpdate} className="p-3 border rounded bg-light">
                {/* Stock ID - read-only */}
                <div className="mb-3">
                    <label className="form-label">Stock ID</label>
                    <input type="text" className="form-control" value={stock.stockID} disabled />
                </div>

                {/* Quantity */}
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={stock.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Restock Threshold */}
                <div className="mb-3">
                    <label className="form-label">Restock Threshold</label>
                    <input
                        type="number"
                        className="form-control"
                        name="restockThreshold"
                        value={stock.restockThreshold}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Bought From */}
                <div className="mb-3">
                    <label className="form-label">Bought From</label>
                    <input
                        type="text"
                        className="form-control"
                        name="boughtFrom"
                        value={stock.boughtFrom}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Bought For */}
                <div className="mb-3">
                    <label className="form-label">Bought For</label>
                    <input
                        type="number"
                        className="form-control"
                        name="boughtFor"
                        value={stock.boughtFor}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Action Buttons */}
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

export default EditStock;
