import axiosInstance from "@/config/axios";


export const editGoldPrice = async (data:any) => {
  const response = await axiosInstance.patch(`/goldPrice/${data.id}`, data);
  return response.data;
};

export const getGoldPrice = async () => {
  const response = await axiosInstance.get(`/goldPrice`);
  return response.data;
};  

