import { api } from "../api";

const createBanner = async (data: FormData) => {
    console.log("The Data in createBanner api is:", data);

    try {
        const response = await api.post(`/banners`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("The createBanner API response is: ", response);

        return response.data;
    } catch (error) {
        console.log("The createBanner API Error is:", error);

        throw error;
    }
};

export default createBanner;
