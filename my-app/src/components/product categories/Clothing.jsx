// Import React hooks for managing state and side effects
import { useEffect, useState } from "react";

// Import the service function for fetching products by category
import { fetchProductsByCategory } from "../../services/ProductService";

// Functional Component: Clothing
// Purpose: Fetches and displays all products under the "Clothing & Bags" category
const Clothing = () => {
    // State to store the fetched list of clothing & bag products
    const [products, setProducts] = useState([]);

    // useEffect hook to call fetchProducts once on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Method: fetchProducts
    // Purpose: Retrieve products from the backend filtered by category
    const fetchProducts = async () => {
        try {
            const data = await fetchProductsByCategory("Clothing and Bags");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div className="container mt-4">
            {/* Section Title */}
            <h2 className="text-center">Clothing & Bags</h2>

            <div className="row">
                {/* Check if products exist */}
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

                                {/* Product Details */}
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">{product.productDesc}</p>
                                    <p className="card-text fw-bold">${product.productPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Message when no products are found
                    <p className="text-center" style={{ color: "white" }}>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

// Export the Clothing component for use in routes or other components
export default Clothing;
