import { APIResponse } from "@/interfaces/common.schemas";
import { IUser, SignupDataSchema } from "@/interfaces/user.schemas";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

// Use APIResponse<User> to define the expected response
const SignupApi = async ({ data }: { data: SignupDataSchema }): Promise<APIResponse<IUser>> => {
    try {
        const response: AxiosResponse<APIResponse<IUser>> = await api.post<APIResponse<IUser>>(
            `/auth/signup`,
            data,
        );
        console.log("The Signup API Response is:", response);

        return response.data;
    } catch (error) {
        console.log("The Signup API Error is:", error);

        if (error instanceof AxiosError) {
            // Throw original AxiosError always to preserve details
            throw error;
        }

        throw new Error("An unknown error occurred");
    }
};

export default SignupApi;
