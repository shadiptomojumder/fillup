import { api } from "../api";

const UpdateCategory = async ({categoryId,data}:{categoryId:string,data:FormData}) => {
    console.log("The Data in UpdateCategory api is:", data);

    try {
        const response = await api.patch(`/categories/${categoryId}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("response in UpdateCategory.ts file: ", response);

        return response.data;
    } catch (error) {
        console.log("The Error in UpdateCategory api is:", error);

        throw error;
    }
};

export default UpdateCategory;
