// Importing React core functionality
import { useEffect, useState } from "react";

// Importing the product-fetching function from the service
import { fetchProductsByCategory } from "../../services/ProductService";

// Functional Component: LogoMaker
// Purpose: Displays products related to the Logo Maker category
const LogoMaker = () => {
    // State to store the list of products
    const [products, setProducts] = useState([]);

    // useEffect hook to fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to fetch products for the Logo Maker category
    const fetchProducts = async () => {
        try {
            // Fetching products via the service
            const data = await fetchProductsByCategory("Logo Maker");
            // Updating the state with the fetched products
            setProducts(data);
        } catch (error) {
            // Logging any errors that occur during the fetching process
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div className="container mt-4">
            {/* Page Title */}
            <h2 className="text-center">Logo Maker</h2>
            <div className="row">
                {/* Conditional rendering based on the presence of products */}
                {products.length > 0 ? (
                    // Mapping through the products array and rendering a card for each product
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
                                <div className="card-body text-center">
                                    {/* Product Title */}
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
                    // Displayed when no products are available in the category
                    <p className="text-center" style={{ color: "white" }}>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

// Exporting the LogoMaker component for use elsewhere in the application
export default LogoMaker;
