// Importing necessary hooks from React and react-router-dom
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importing axios for making HTTP requests
import axios from "axios";

// Functional Component: ShopInfo
// Purpose: Fetch and edit the shop details

const ShopInfo = () => {
    // Hook for navigation (to navigate between routes)
    const navigate = useNavigate();

    // State to store shop information
    const [shopInfo, setShopInfo] = useState({
        shopName: "",
        shopAddress: "",
        shopNumber: "",
        shopLogo: "",
        createdAt: ""
    });

    // State to manage loading state
    const [loading, setLoading] = useState(true);

    // useEffect hook to fetch shop details when the component mounts
    useEffect(() => {
        fetchShopDetails();
    }, []);

    // Function to fetch shop details from the server
    const fetchShopDetails = async () => {
        try {
            const response = await axios.get("http://localhost:3001/shop-info");
            setShopInfo(response.data); // Updating the state with fetched data
        } catch (error) {
            console.error("Error fetching shop details:", error); // Logging error to console
            alert("Error fetching shop details. Check the console for more info.");
        } finally {
            setLoading(false); // Set loading to false once the data is fetched
        }
    };

    // Function to handle input changes in the form
    const handleChange = (e) => {
        setShopInfo({ ...shopInfo, [e.target.name]: e.target.value }); // Update the specific field in shopInfo state
    };

    // Function to handle form submission and update shop info
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Sending PATCH request to update shop information
            await axios.patch("http://localhost:3001/shop-info", shopInfo);
            alert("Shop info updated successfully!"); // Show success alert
            navigate(-1); // Navigate back to the previous page
        } catch (error) {
            console.error("Error updating shop info:", error); // Logging error to console
            alert("Error updating shop info. Check the console for more info.");
        }
    };

    // Loading state check: If data is still being fetched, show loading message
    if (loading) {
        return <div className="text-center mt-4">Loading shop details...</div>;
    }

    // JSX rendering the form for editing shop info
    return (
        <div className="container mt-4">
            <h2 className="text-center">Edit Shop Info</h2>

            {/* Form to edit shop information */}
            <form onSubmit={handleUpdate} className="p-3 border rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Shop Name</label>
                    <input type="text" className="form-control" name="shopName" value={shopInfo.shopName} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="shopAddress" value={shopInfo.shopAddress} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" name="shopNumber" value={shopInfo.shopNumber} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Shop Logo URL</label>
                    <input type="text" className="form-control" name="shopLogo" value={shopInfo.shopLogo} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Created At</label>
                    <input type="text" className="form-control" value={shopInfo.createdAt} disabled />
                </div>

                {/* Buttons to cancel or save changes */}
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

// Exporting the ShopInfo component to be used in other parts of the application
export default ShopInfo;
