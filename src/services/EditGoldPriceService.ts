import axiosInstance from "@/config/axios";


export const editGoldPrice = async (data:any) => {
    try {
        const response = await axiosInstance.patch(`/goldPrice/${data._id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error editing gold price:', error);
        throw error;
    }
};

export const getGoldPrice = async () => {
    try {
        const response = await axiosInstance.get(`/goldPrice`);
        return response.data;
    } catch (error) {
        console.error('Error fetching gold price:', error);
        throw error;
    }
};  

