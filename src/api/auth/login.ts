import { APIResponse } from "@/interfaces/common.schemas";
import { IUser, LoginDataSchema } from "@/interfaces/user.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

// Interface representing a login response object.
export interface LoginResponseData {
    user: IUser;
    accessToken: string;
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

        // console.log("The Login API Response is:", response);

        return response.data;
    } catch (error) {
        console.log("The Login API Error is:", error);

        if (error instanceof AxiosError) {
            // Throw original AxiosError always to preserve details
            throw error;
        }

        throw new Error("An unknown error occurred");
    }
};

export default login;
