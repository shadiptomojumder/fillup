import { APIResponse, LoginResponseData } from "@/interfaces/common.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

interface LoginDataSchema {
    email?: string;
    phone?: string;
    password: string;
}

// Use APIResponse<User> to define the expected response
const login = async ({
    data,
}: {
    data: LoginDataSchema;
}): Promise<APIResponse<LoginResponseData>> => {
    try {
        const response: AxiosResponse<APIResponse<LoginResponseData>> = await api.post<
            APIResponse<LoginResponseData>
        >(`/auth/login`, data);
        console.log("The Login API Response is:", response);

        return response.data;
    } catch (error) {
        console.log("The Login API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default login;
