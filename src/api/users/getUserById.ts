import { User } from "@/interfaces/user.schemas";
import { APIResponse } from "@/interfaces/common.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

const getUserById = async ({ userId }: { userId: string }): Promise<User> => {
    try {
        const response: AxiosResponse<APIResponse<User>> = await api.get<APIResponse<User>>(
            `/users/${userId}`,
        );

        // Ensure the API response contains valid data
        if (!response.data || !response.data.data) {
            throw new Error("Invalid API response: Missing user data");
        }

        return response.data.data;
    } catch (error) {
        console.log("The Get User By ID API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default getUserById;
