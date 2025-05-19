import { APIResponse } from "@/interfaces/common.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

/**
 * Props for deleting a single or multiple products
 */
interface DeleteProductProps {
    productId?: string;
    ids?: string[];
}


const deleteProducts = async ({
    productId,
    ids,
}: DeleteProductProps): Promise<APIResponse<null>> => {
    try {
        let response: AxiosResponse<APIResponse<null>>;

        if (productId) {
            // Delete a single product
            response = await api.delete<APIResponse<null>>(`/products/${productId}`);
        } else if (ids && ids.length > 0) {
            // Delete multiple products
            response = await api.delete<APIResponse<null>>(`/products`, {
                data: { ids }, // Sending array of IDs in the request body
            });
        } else {
            throw new Error("Either 'productId' or 'ids' must be provided.");
        }

        console.log("The Delete Products API Response is:", response);

        return response.data;
    } catch (error) {
        console.log("The Delete Products API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default deleteProducts;
