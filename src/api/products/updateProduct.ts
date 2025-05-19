import { APIResponse } from "@/interfaces/common.schemas";
import { Product } from "@/interfaces/product.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

// Interface for updating a product
interface UpdateProductProps {
    productId: string;
    data: FormData | Partial<Product>;
}

const updateProduct = async ({
    productId,
    data,
}: UpdateProductProps): Promise<APIResponse<Product>> => {
    try {
        const isFormData = data instanceof FormData;
        const headers = isFormData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" };

        const response: AxiosResponse<APIResponse<Product>> = await api.patch<APIResponse<Product>>(
            `/products/${productId}`,
            data,
            {
                headers,
            },
        );
        // Ensure response.data exists and has a `data` property
        if (!response.data || !response.data.data) {
            throw new Error("Invalid API response: Missing data field");
        }

        // console.log("Response in updateProduct.ts file:", response);

        return response.data;
    } catch (error) {
        console.log("The Update Product API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default updateProduct;
