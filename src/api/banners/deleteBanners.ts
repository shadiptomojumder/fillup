import { api } from "../api"

interface DeleteBannersProps {
    bannerId?:string;
    ids?: string[];  
}



const deleteBanners = async ( {bannerId,ids}:DeleteBannersProps ) => {
    try {
        let response;

        if (bannerId) {
            // Single category deletion
            response = await api.delete(`/banners/${bannerId}`);
        } else if (ids && ids.length > 0) {
            // Multiple category deletion
            response = await api.delete(`/banners`, {
                data: { ids }, // Sending array of IDs in request body
            });
        } else {
            throw new Error("Either 'bannerId' or 'ids' must be provided.");
        }

        console.log("The deleteBanners API Response is:", response);
        return response.data;
    } catch (error) {
        console.log("The deleteBanners API Error is:",error);
        throw error
    }
}

export default deleteBanners;