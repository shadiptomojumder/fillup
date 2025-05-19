import { APIResponse } from "@/interfaces/common.schemas";
import { SignupSchema, User } from "@/interfaces/user.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

// Use APIResponse<User> to define the expected response
const signup = async ({ data }: { data: SignupSchema }): Promise<APIResponse<User>> => {
    try {
        const response: AxiosResponse<APIResponse<User>> = await api.post<APIResponse<User>>(
            `/auth/signup`,
            data,
        );
        console.log("The Signup API Response is:", response);

        return response.data;
    } catch (error) {
        console.log("The Signup API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default signup;
