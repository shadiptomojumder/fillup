import { api } from "../api"


const getBannerById = async ({bannerId}:{bannerId:string}) => {
    try {
        const response = await api.get(`/categories/${bannerId}`);
        console.log("The getBannerById API Response is:", response);
        
        return response.data.data
    } catch (error) {
        console.log("The getBannerById API Error is:", error);
        
        throw error
    }
}

export default getBannerById;