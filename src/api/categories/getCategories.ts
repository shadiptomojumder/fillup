import { Category } from "@/interfaces/category.schemas";
import { APIResponse } from "@/interfaces/common.schemas";
import { AxiosError } from "axios";
import { api } from "../api";

/**
 * Interface for category query parameters
 */
interface CategoryQueryParams {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    limit?: number;
    page?: number;
    title?: string; // Optional: Fetch by category name
}

const getCategories = async (queryParams: CategoryQueryParams = {}): Promise<Category[]> => {
    try {
        // Build query string dynamically
        const buildQueryString = (queryParams: CategoryQueryParams) => {
            return Object.entries(queryParams)
                .filter(([, value]) => value !== undefined && value !== null)
                .map(
                    ([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
                )
                .join("&");
        };

        const queryString = buildQueryString(queryParams);
        const url = queryString ? `/categories?${queryString}` : "/categories";

        const response = await api.get<APIResponse<Category[]>>(url);
        // console.log("The Get Categories API Response is:", response);

        return response.data?.data ?? [];
    } catch (error) {
        console.log("The Get Categories API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default getCategories;
