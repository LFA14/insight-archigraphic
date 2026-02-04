// Importing necessary hooks from React
import { useEffect, useState } from "react";

// Importing the service function to fetch products by category
import { fetchProductsByCategory } from "../../services/ProductService";

// Functional Component: PromotionalProducts
// Purpose: Fetch and display products under the 'Promotional Products' category
const PromotionalProducts = () => {
    // State to store the fetched products
    const [products, setProducts] = useState([]);

    // useEffect hook to fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to fetch products based on category 'Promotional Products'
    const fetchProducts = async () => {
        try {
            // Fetching products via the service
            const data = await fetchProductsByCategory("Promotional Products");
            // Updating the state with the fetched products
            setProducts(data);
        } catch (error) {
            // Logging any errors that occur during the fetching process
            console.error("Error fetching products:", error);
        }
    };

    // JSX for rendering the component
    return (
        <div className="container mt-4">
            {/* Page Title */}
            <h2 className="text-center">Promotional Products</h2>

            {/* Row to display fetched products */}
            <div className="row">
                {/* Check if products array has data */}
                {products.length > 0 ? (
                    // Looping through each product and rendering its details
                    products.map((product) => (
                        <div key={product.id} className="col-md-4 col-sm-6 mb-4">
                            {/* Product Card */}
                            <div className="card shadow-sm">
                                {/* Product Image */}
                                <img
                                    src={`http://localhost:3001/public/${product.productImage}`}
                                    className="card-img-top"
                                    alt={product.productName}
                                    style={{ height: "200px", objectFit: "cover" }} // Styling the image
                                />
                                <div className="card-body text-center">
                                    {/* Product Name */}
                                    <h5 className="card-title">{product.productName}</h5>
                                    {/* Product Description */}
                                    <p className="card-text">{product.productDesc}</p>
                                    {/* Product Price */}
                                    <p className="card-text fw-bold">${product.productPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Message displayed when no products are found
                    <p className="text-center" style={{ color: "white" }}>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

// Exporting the PromotionalProducts component for usage in other parts of the application
export default PromotionalProducts;
