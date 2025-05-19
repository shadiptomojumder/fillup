import { api } from "../api"


const getBanners = async () => {
    try {
        const response = await api.get(`/banners`);
        console.log("The getBanners API Response is:", response);
        
        return response.data.data
    } catch (error) {
        console.log("ThegetBanners API Error is:", error);
        
        throw error
    }
}

export default getBanners;