// Import necessary hooks and components for functionality and UI
import { useEffect, useState } from "react";  // useState and useEffect for state management and side effects
import { useNavigate, useParams } from "react-router-dom";  // useNavigate for navigation, useParams for URL parameters
import { updateProduct, getProductById } from "../../services/ProductService";// Import the service functions

// EditProduct Component
// This component allows the admin to edit the details of an existing product.
const EditProduct = () => {
    const { id } = useParams();  // Extracting product ID from URL parameters
    const navigate = useNavigate();  // Hook to navigate between pages
    const [product, setProduct] = useState({
        productID: "",
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productImage: null,
    });

    // Defining the categories for the product
    const categories = [
        "Business Cards",
        "Postcards and Advertising",
        "Signs and Banners",
        "Clothing and Bags",
        "Promotional Products",
        "Home and Gifts",
        "Logo Maker",
        "Invitations and Wedding Cards",
        "Labels and Stickers"
    ];

    // useEffect to fetch product details when the component loads
    useEffect(() => {
        fetchProductDetails();
    }, []);  // Empty dependency array ensures this runs once on component mount

    // Fetching product details from the API using the service function
    const fetchProductDetails = async () => {
        try {
            const productData = await getProductById(id);  // Call the service function to fetch product data
            setProduct(productData.data);  // Set the fetched product data to state
        } catch (error) {
            alert("Error fetching product details: " + error);  // Show an error message if fetching fails
        }
    };

    // Handling input field changes
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });  // Update the product state
    };

    // Handling file input change for product image
    const handleFileChange = (e) => {
        setProduct({ ...product, productImage: e.target.files[0] || null });  // Update the product image state
    };

    // Handling form submission to update product details using the service function
    const handleUpdate = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        try {
            await updateProduct(id, product);  // Call the service function to update the product
            alert("Product updated successfully!");  // Success message
            navigate(-1);  // Navigate back to the previous page
        } catch (error) {
            alert("Error updating product: " + error);  // Show an error message if the update fails
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Edit Product</h2>

            <form onSubmit={handleUpdate} className="p-3 border rounded bg-light">
                {/* Display product ID (disabled field) */}
                <div className="mb-3">
                    <label className="form-label">Product ID</label>
                    <input type="text" className="form-control" value={product.productID} disabled />
                </div>

                {/* Product Name input field */}
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Description input field */}
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="productDesc"
                        value={product.productDesc}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Price input field */}
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="productPrice"
                        value={product.productPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Category dropdown */}
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        className="form-control"
                        name="productCategory"
                        value={product.productCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product Image upload (optional) */}
                <div className="mb-3">
                    <label className="form-label">Upload Image (Optional)</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Buttons for canceling and saving changes */}
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

// Exporting the EditProduct component for use in other parts of the application
export default EditProduct;
