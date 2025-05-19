import { APIResponse } from "@/interfaces/common.schemas";
import { Product } from "@/interfaces/product.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

// Use APIResponse<Product> to define the expected response
const createProduct = async (data: FormData): Promise<APIResponse<Product>> => {
    try {
        const response: AxiosResponse<APIResponse<Product>> = await api.post<APIResponse<Product>>(
            `/products`,
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );
        console.log("The Create Product API Response is:", response);

        return response.data;
    } catch (error) {
        console.log("The Create Product API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default createProduct;
