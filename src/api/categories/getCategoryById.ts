import { Category } from "@/interfaces/category.schemas";
import { APIResponse } from "@/interfaces/common.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

const getCategoryById = async ({ categoryId }: { categoryId: string }): Promise<Category> => {
    try {
        const response: AxiosResponse<APIResponse<Category>> = await api.get<APIResponse<Category>>(
            `/categories/${categoryId}`,
        );

        // Ensure the API response contains valid data
        if (!response.data || !response.data.data) {
            throw new Error("Invalid API response: Missing category data");
        }

        return response.data.data;
    } catch (error) {
        console.log("The Get Category By ID API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default getCategoryById;
