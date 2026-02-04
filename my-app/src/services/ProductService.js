import http from "../http-common";
import { getTokenBearer } from "../utility/Utility";

/*
-----------------------------------------------------------------------
  Purpose: Fetches all products from the system
  Returns: Axios promise containing an array of product objects
-----------------------------------------------------------------------
*/
export const getAllProducts = () => {
    return http.get("/products", {
        headers: {
            Authorization: getTokenBearer(),
        },
    });
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches a single product by ID
  Parameters:
    - productId: string - The ID of the product to retrieve
  Returns: Product object on success
-----------------------------------------------------------------------
*/
export const getProductById = async (productId) => {
    try {
        const response = await http.get(`/products/${productId}`, {
            headers: {
                Authorization: getTokenBearer(),
            },
        });

        return response;
    } catch (error) {
        console.error(`Error in getProductById for ID ${productId}:`, error.response?.data || error.message);
        throw error;
    }
};


/*
-----------------------------------------------------------------------
  Purpose: Updates a product's information
  Parameters:
    - productId: string - The ID of the product to update
    - productData: object - The updated product data
  Returns: Updated product object
-----------------------------------------------------------------------
*/
export const updateProduct = async (productId, productData) => {
    try {
        const response = await http.patch(`/products/${productId}`, productData, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error in updateProduct for ID ${productId}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific product by ID
  Parameters: 
    - productId: string - The product ID to delete
  Returns: Nothing on success
-----------------------------------------------------------------------
*/
export const deleteProduct = async (productId) => {
    try {
        await http.delete(`/products/${productId}`, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
    } catch (error) {
        console.error(`Error in deleteProduct for ID ${productId}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Adds a new product to the system
  Parameters:
    - productData: object - The data for the new product to be created
  Returns: The created product object
-----------------------------------------------------------------------
*/
export const createProduct = async (productData) => {
    try {
        const response = await http.post("/products", productData, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error in createProduct:`, error.response?.data || error.message);
    }
};
/*
-----------------------------------------------------------------------
  Purpose: Fetches products by a specific category
  Parameters:
    - category: string - The category to filter products by
  Returns: 
    - An array of products that belong to the specified category
-----------------------------------------------------------------------
*/
export const fetchProductsByCategory = async (category) => {
    const response = await http.get(`/products?category=${encodeURIComponent(category)}`);
    return response.data;
};
