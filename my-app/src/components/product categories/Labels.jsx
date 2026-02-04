// Importing React core functionality
import { useEffect, useState } from "react";

// Importing the product-fetching function from the service
import { fetchProductsByCategory } from "../../services/ProductService";

// Functional Component: Labels
// Purpose: Displays products related to Labels & Stickers category
const Labels = () => {
    // State to store products data
    const [products, setProducts] = useState([]);

    // useEffect hook to fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to fetch products from the server based on the Labels & Stickers category
    const fetchProducts = async () => {
        try {
            // Fetching products via the service
            const data = await fetchProductsByCategory("Labels and Stickers");
            // Storing the fetched products data in the state
            setProducts(data);
        } catch (error) {
            // If there is an error while fetching, log it to the console
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div className="container mt-4">
            {/* Page Title */}
            <h2 className="text-center">Labels & Stickers</h2>
            <div className="row">
                {/* Conditional rendering based on the presence of products */}
                {products.length > 0 ? (
                    // Mapping through products and rendering each one as a card
                    products.map((product) => (
                        <div key={product.id} className="col-md-4 col-sm-6 mb-4">
                            <div className="card shadow-sm">
                                {/* Product image */}
                                <img
                                    src={`http://localhost:3001/public/${product.productImage}`}
                                    className="card-img-top"
                                    alt={product.productName}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center">
                                    {/* Product name */}
                                    <h5 className="card-title">{product.productName}</h5>
                                    {/* Product description */}
                                    <p className="card-text">{product.productDesc}</p>
                                    {/* Product price */}
                                    <p className="card-text fw-bold">${product.productPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Displayed when no products are found in the category
                    <p className="text-center" style={{ color: "white" }}>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

// Exporting the Labels component as default for use in routing or rendering elsewhere
export default Labels;
