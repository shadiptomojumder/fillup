import { APIResponse } from "@/interfaces/common.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

// Define the expected response structure for the logout API
interface LogoutResponse {
    message: string;
}

// Use APIResponse<LogoutResponse> to define the expected response
export const logout = async (): Promise<APIResponse<LogoutResponse>> => {
    try {
        const response: AxiosResponse<APIResponse<LogoutResponse>> = await api.post<
            APIResponse<LogoutResponse>
        >(
            `/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        );
        console.log("The Logout API Response is:", response);

        return response.data;
    } catch (error) {
        console.log("The Logout API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};
