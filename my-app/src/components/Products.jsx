// Importing necessary React and utility modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllProducts,
    deleteProduct
} from "../services/ProductService"; // Importing product service functions

// Functional Component: Products
// Purpose: Displays a list of all products with the ability to edit and delete products
const Products = () => {
    // State to store products data
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Hook to navigate between pages

    // useEffect hook to fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to fetch all products from the server
    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(); // Using service function
            setProducts(response.data);
        } catch (e) {
            alert("Error fetching products: " + e);
        }
    };

    // Function to handle product deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id); // Using service function
                setProducts(products.filter((product) => product.productID !== id));
                alert("Product deleted successfully!");
            } catch (e) {
                alert("Error deleting product: " + e);
            }
        }
    };

    return (
        <div className="container">
            {/* Header section with buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
                    ← Back
                </button>
                <h2 className="text-center flex-grow-1">Products</h2>
                <button className="btn btn-success" onClick={() => navigate("/add-product")}>
                    + Add Product
                </button>
            </div>

            {/* Table to display product details */}
            <div className="table-responsive">
                <table className="table table-bordered table-light">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Rendering each product in a table row */}
                        {products.map((product) => (
                            <tr key={product.productID}>
                                <td>{product?.productID}</td>
                                <td>
                                    {product?.productImage ? (
                                        <img
                                            src={`http://localhost:3001/products/${product.productImage}`}
                                            alt={product.productName}
                                            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td>{product?.productName}</td>
                                <td>{product?.productDesc}</td>
                                <td>${product?.productPrice}</td>
                                <td>{product?.productCategory || "No Category"}</td>
                                <td className="text-end">
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => navigate(`/edit-product/${product.productID}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(product.productID)}
                                    >
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

export default Products;
