// Import necessary dependencies
import http from "../../http-common";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createProduct } from "../../services/ProductService";
// Component for adding or editing a product
const AddProduct = () => {
    const { id } = useParams(); // Get product ID from URL (if editing)
    const navigate = useNavigate(); // Navigation hook

    // Product state
    const [product, setProduct] = useState({
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productImage: null
    });

    // Predefined list of categories
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

    // Load product data if in edit mode
    useEffect(() => {
        if (id) {
            fetchProductById(id);
        }
    }, [id]);

    // Fetch product details by ID
    const fetchProductById = async (productId) => {
        try {
            const res = await http.get(`/products/${productId}`);
            setProduct({
                productName: res.data.productName,
                productDesc: res.data.productDesc,
                productPrice: res.data.productPrice,
                productCategory: res.data.productCategory,
                productImage: null // File input must be manually re-uploaded
            });
        } catch (err) {
            console.error("Error fetching product:", err);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "productImage") {
            setProduct((prev) => ({ ...prev, productImage: files[0] }));
        } else {
            setProduct((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Submit product data (create or update)
    const saveProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productName", product.productName);
        formData.append("productDesc", product.productDesc);
        formData.append("productPrice", product.productPrice);
        formData.append("productCategory", product.productCategory);
        if (product.productImage) {
            formData.append("productImage", product.productImage);
        }

        try {
            if (id) {
                // Update product
                await http.patch(`/products/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                // Create new product
                await http.post("/products", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            alert(`Product ${id ? "updated" : "added"} successfully!`);
            navigate("/products"); // Redirect after success
        } catch (err) {
            console.error("Error saving product:", err);
            alert("Failed to save product.");
        }
    };

    return (
        <div className="container mt-4">
            {/* Navigation link */}
            <nav><Link to="/products">Back</Link></nav>

            {/* Title */}
            <h2 className="text-center">{id ? "Edit Product" : "Add Product"}</h2>

            {/* Form for product info */}
            <form onSubmit={saveProduct} className="p-3 border rounded bg-light">
                {/* Product name input */}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product description input */}
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="productDesc"
                        value={product.productDesc}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product price input */}
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

                {/* Product category dropdown */}
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
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Image upload field */}
                <div className="mb-3">
                    <label className="form-label">Upload Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="productImage"
                        accept="image/*"
                        onChange={handleChange}
                        required={!id} // Required only when adding
                    />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary">
                    {id ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
