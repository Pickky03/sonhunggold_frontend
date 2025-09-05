import axiosInstance from '@/config/axios';
import { GoldPriceItem } from '@/hooks/useGiaVangSocket';

export const getGoldPrice = async (): Promise<GoldPriceItem[]> => {
  try {
    const response = await axiosInstance.get('/goldPrice');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editGoldPrice = async (
  data: GoldPriceItem
): Promise<GoldPriceItem> => {
  try {
    const response = await axiosInstance.patch(`/goldPrice/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing gold price:', error);
    throw error;
  }
};
