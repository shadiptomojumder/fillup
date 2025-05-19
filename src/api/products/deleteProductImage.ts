import { APIResponse } from "@/interfaces/common.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

interface DeleteProductImageProps {
    productId: string;
    imageUrl: string; // List of image URLs to delete
}

const deleteProductImage = async ({
    productId,
    imageUrl,
}: DeleteProductImageProps): Promise<APIResponse<{ message: string }>> => {
    try {
        const response: AxiosResponse<APIResponse<{ message: string }>> = await api.delete<
            APIResponse<{ message: string }>
        >(`/products/${productId}/image`, {
            data: { imageUrl }, // Send image URLs in request body
        });

        console.log("Response from deleteProductImage API:", response);

        return response.data;
    } catch (error) {
        console.log("Error in deleteProductImage API:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data;
        }

        throw new Error("An unknown error occurred");
    }
};

export default deleteProductImage;
