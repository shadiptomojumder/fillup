import { api } from "../api"


const getBannerImages = async () => {
    try {
        const response = await api.get(`/banners/images`);
        console.log("The getBannerImages API Response is:", response);
        
        return response.data.data
    } catch (error) {
        console.log("The getBannerImages API Error is:", error);
        
        throw error
    }
}

export default getBannerImages;