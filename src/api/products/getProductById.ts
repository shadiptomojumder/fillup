import { APIResponse } from "@/interfaces/common.schemas";
import { IProduct } from "@/interfaces/product.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

const getProductById = async ({ productId }: { productId: string }): Promise<IProduct> => {
    try {
        const response: AxiosResponse<APIResponse<IProduct>> = await api.get<APIResponse<IProduct>>(
            `/products/${productId}`,
        );

        // console.log("The Get Product By ID API Response is:", response);
        // Ensure the API response contains valid data
        if (!response.data || !response.data.data) {
            throw new Error("Invalid API response: Missing product data");
        }

        return response.data.data;
    } catch (error) {
        console.log("The Get Product By ID API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default getProductById;
