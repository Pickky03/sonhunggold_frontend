import { useEffect, useState } from 'react';
import socket from '@/lib/socket'; // dùng lại 1 socket duy nhất
import { getGoldPrice } from '@/services/EditGoldPriceService';

export interface GoldPriceItem {
  _id: string;
  goldtype: string;
  buyprice: number;
  sellprice: number;
  updatedAt?: string;
}

export default function useGiaVangSocket() {
  const [goldPrice, setGoldPrice] = useState<GoldPriceItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGoldPrice();
      if (Array.isArray(res)) setGoldPrice(res);
    };
    fetchData();

    console.log("🧠 Socket dùng lại:", socket.id);

    const handleUpdate = (updatedItem: GoldPriceItem | GoldPriceItem[]) => {
      console.log("📩 Nhận realtime:", updatedItem);
      setGoldPrice((prev) => {
        if (Array.isArray(updatedItem)) return updatedItem;
        return prev.map((item) =>
          item._id === updatedItem._id ? { ...item, ...updatedItem } : item
        );
      });
    };

    socket.on("gia-vang-update", handleUpdate);

    return () => {
      socket.off("gia-vang-update", handleUpdate);
    };
  }, []);

  return goldPrice;
}
