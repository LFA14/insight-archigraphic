// Importing necessary hooks from React
import { useState } from "react";
// Importing useNavigate from react-router-dom for navigation
import { useNavigate } from "react-router-dom";

// Importing the stock service function
import { createStock } from "../../services/StockService";

// Functional Component: AddStock
// Purpose: To add a new stock item to the system by sending stock details to the backend.
const AddStock = () => {
    // Using useNavigate hook to navigate programmatically
    const navigate = useNavigate();

    // State to hold the stock data
    const [stock, setStock] = useState({
        productID: "",          // The product ID for the stock item
        quantity: "",           // The quantity of the stock item
        restockThreshold: "",   // The restock threshold for the stock item
        boughtFrom: "",         // Supplier from whom the stock was bought
        boughtFor: "",          // Price at which the stock was bought
    });

    // Function to handle input changes and update the state
    const handleChange = (e) => {
        setStock({ ...stock, [e.target.name]: e.target.value });
    };

    // Function to handle form submission and send the new stock data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStock(stock); // Call the service method
            alert("Stock added successfully!");
            navigate("/stock"); // Redirect to stock list
        } catch (error) {
            alert("Error adding stock: " + error);
        }
    };

    // JSX structure to render the form for adding a new stock item
    return (
        <div className="container mt-4">
            <h2 className="text-center">Add Stock</h2>

            <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Product ID</label>
                    <input type="text" className="form-control" name="productID" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-control" name="quantity" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Restock Threshold</label>
                    <input type="number" className="form-control" name="restockThreshold" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Bought From</label>
                    <input type="text" className="form-control" name="boughtFrom" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Bought For</label>
                    <input type="number" className="form-control" name="boughtFor" onChange={handleChange} required />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                        Add Stock
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStock;
