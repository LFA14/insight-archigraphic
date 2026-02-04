// Importing necessary hooks from React
import { useEffect, useState } from "react";

// Importing the service function to fetch products by category
import { fetchProductsByCategory } from "../../services/ProductService";

// Functional Component: Signs
// Purpose: Fetch and display products in the 'Signs & Banners' category
const Signs = () => {
    // State to store the fetched products
    const [products, setProducts] = useState([]);

    // useEffect hook to fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to fetch products from the server based on the 'Signs & Banners' category
    const fetchProducts = async () => {
        try {
            // Fetching products via the service
            const data = await fetchProductsByCategory("Signs and Banners");
            // Updating the state with the fetched products
            setProducts(data);
        } catch (error) {
            // Logging any errors that occur during the fetching process
            console.error("Error fetching products:", error);
        }
    };

    // JSX to render the product list or a message if no products are found
    return (
        <div className="container mt-4">
            <h2 className="text-center">Signs & Banners</h2>
            <div className="row">
                {products.length > 0 ? (
                    // Mapping over the products array to display each product in a card
                    products.map((product) => (
                        <div key={product.id} className="col-md-4 col-sm-6 mb-4">
                            <div className="card shadow-sm">
                                <img
                                    src={`http://localhost:3001/public/${product.productImage}`}
                                    className="card-img-top"
                                    alt={product.productName}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">{product.productDesc}</p>
                                    <p className="card-text fw-bold">${product.productPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Display a message if no products are found
                    <p className="text-center" style={{ color: "white" }}>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

// Exporting the Signs component to be used in other parts of the application
export default Signs;
