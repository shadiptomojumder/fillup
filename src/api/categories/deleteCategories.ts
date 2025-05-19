import { api } from "../api"

interface DeleteCategoryProps {
    categoryId?:string;
    ids?: string[];  
}



const DeleteCategory = async ( {categoryId,ids}:DeleteCategoryProps ) => {
    try {
        let response;

        if (categoryId) {
            // Single category deletion
            response = await api.delete(`/categories/${categoryId}`);
        } else if (ids && ids.length > 0) {
            // Multiple category deletion
            response = await api.delete(`/categories`, {
                data: { ids }, // Sending array of IDs in request body
            });
        } else {
            throw new Error("Either 'categoryId' or 'ids' must be provided.");
        }

        console.log("Response from DeleteCategory API:", response);
        return response.data;
    } catch (error) {
        console.log("Error in DeleteCategory API:",error);
        throw error
    }
}

export default DeleteCategory;