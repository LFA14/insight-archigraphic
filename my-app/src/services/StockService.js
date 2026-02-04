import http from "../http-common";
import { getTokenBearer } from "../utility/Utility";

/*
-----------------------------------------------------------------------
  Purpose: Fetches all stock entries from the system
  Returns: Axios promise containing an array of stock objects
-----------------------------------------------------------------------
*/
export const getAllStock = () => {
    return http.get("/stock", {
        headers: {
            Authorization: getTokenBearer(),
        },
    });
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches a single stock entry by ID
  Parameters:
    - stockID: string - The ID of the stock to retrieve
  Returns: Stock object on success
-----------------------------------------------------------------------
*/
export const getStockById = async (stockID) => {
    try {
        const response = await http.get(`/stock/${stockID}`, {
            headers: {
                Authorization: getTokenBearer(),
            },
        });

        return response;
    } catch (error) {
        console.error(`Error in getStockById for ID ${stockID}:`, error.response?.data || error.message);
        throw error;
    }
};


/*
-----------------------------------------------------------------------
  Purpose: Updates a stock entry
  Parameters:
    - stockID: string - The ID of the stock entry to update
    - stockData: object - The updated stock data
  Returns: Updated stock object
-----------------------------------------------------------------------
*/
export const updateStock = async (stockID, stockData) => {
    try {
        const response = await http.patch(`/stock/${stockID}`, stockData, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error in updateStock for ID ${stockID}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific stock entry by ID
  Parameters:
    - stockID: string - The stock entry ID to delete
  Returns: Nothing on success
-----------------------------------------------------------------------
*/
export const deleteStock = async (stockID) => {
    try {
        await http.delete(`/stock/${stockID}`, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
    } catch (error) {
        console.error(`Error in deleteStock for ID ${stockID}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Adds a new stock entry to the system
  Parameters:
    - stockData: object - The data for the new stock entry to be created
  Returns: The created stock object
-----------------------------------------------------------------------
*/
export const createStock = async (stockData) => {
    try {
        const response = await http.post("/stock", stockData, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error in createStock:`, error.response?.data || error.message);
    }
};
