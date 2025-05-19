import { api } from "../api";

const CreateCategory = async (data: FormData) => {
    console.log("The Data in CreateCategory api is:", data);

    try {
        const response = await api.post(`/categories`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("response in CreateCategory.ts file: ", response);

        return response.data;
    } catch (error) {
        console.log("The Error in CreateCategory api is:", error);

        throw error;
    }
};

export default CreateCategory;
