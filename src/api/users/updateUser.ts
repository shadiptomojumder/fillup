import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { APIResponse } from "@/interfaces/common.schemas";
import { User } from "@/interfaces/user.schemas";

interface UpdateUserParams {
    userId: string;
    data: FormData;
}

const updateUser = async ({ userId, data }: UpdateUserParams): Promise<APIResponse<User>> => {
    console.log("The Data in UpdateUser api is:", data);

    try {
        const response: AxiosResponse<APIResponse<User>> = await api.patch(`/users/${userId}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("response in UpdateUser.ts file: ", response);

        return response.data;
    } catch (error) {
        console.log("The Error in UpdateUser api is:", error);

        if (error instanceof AxiosError && error.response) {
            console.log("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default updateUser;
