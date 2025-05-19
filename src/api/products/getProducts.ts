import { APIResponse } from "@/interfaces/common.schemas";
import { Product } from "@/interfaces/product.schemas";
import { AxiosError } from "axios";
import { api } from "../api";

/**
 * Interface for product query parameters
 */
interface ProductQueryParams {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    limit?: number;
    page?: number;
    name?: string;
    price?: number;
    sku?: string;
    category?: string;
    isFeatured?: boolean;
    isWeekendDeal?: boolean;
}

const getProducts = async (
    queryParams: ProductQueryParams = {},
): Promise<APIResponse<Product[]>> => {
    try {
        // Build query string dynamically
        const buildQueryString = (queryParams: ProductQueryParams) => {
            return Object.entries(queryParams)
                .filter(([, value]) => value !== undefined && value !== null)
                .map(
                    ([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
                )
                .join("&");
        };

        const queryString = buildQueryString(queryParams);

        const url = queryString ? `/products?${queryString}` : "/products";
        // console.log("The URL is:", url);

        const response = await api.get<APIResponse<Product[]>>(url);
        // console.log("The Get ALL Product API Response is:", response);

        return response.data;
    } catch (error) {
        console.log("The Get ALL Product API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default getProducts;
