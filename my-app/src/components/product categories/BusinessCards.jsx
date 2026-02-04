// Import React hooks for state and lifecycle management
import { useEffect, useState } from "react";

import { fetchProductsByCategory } from "../../services/ProductService";

// Functional Component: BusinessCards
// Purpose: Fetch and display all products that belong to the "Business Cards" category
const BusinessCards = () => {
    // State to hold the fetched list of business card products
    const [products, setProducts] = useState([]);

    // useEffect hook to fetch products when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Method: fetchProducts
    // Purpose: Sends a GET request to the backend to retrieve business card products
    const fetchProducts = async () => {
        try {
            const data = await fetchProductsByCategory("Business Cards");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div className="container mt-4">
            {/* Section Title */}
            <h2 className="text-center">Business Cards</h2>

            <div className="row">
                {/* Check if there are products to display */}
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="col-md-4 col-sm-6 mb-4">
                            <div className="card shadow-sm">
                                {/* Product Image */}
                                <img
                                    src={`http://localhost:3001/public/${product.productImage}`}
                                    className="card-img-top"
                                    alt={product.productName}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />

                                {/* Product Information */}
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">{product.productDesc}</p>
                                    <p className="card-text fw-bold">${product.productPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Message displayed if no products are found
                    <p className="text-center" style={{ color: "white" }}>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

// Exporting the BusinessCards component for routing or rendering
export default BusinessCards;
