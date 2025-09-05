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
    // Lấy dữ liệu ban đầu từ API
    const fetchData = async () => {
      try {
        const res = await getGoldPrice();
        if (Array.isArray(res)) setGoldPrice(res);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giá vàng:", error);
      }
    };
    fetchData();

    // Xử lý trạng thái kết nối socket
    const onConnect = () => {
      console.log("🧠 Socket đã kết nối:", socket.id);
    };

    const onDisconnect = () => {
      console.log("⚠️ Socket đã ngắt kết nối");
    };

    // Xử lý cập nhật dữ liệu realtime
    const handleUpdate = (updatedItem: GoldPriceItem | GoldPriceItem[]) => {
      console.log("📩 Nhận realtime:", updatedItem);
      setGoldPrice((prev) => {
        if (Array.isArray(updatedItem)) return updatedItem;
        return prev.map((item) =>
          item._id === updatedItem._id ? { ...item, ...updatedItem } : item
        );
      });
    };

    // Đăng ký các sự kiện socket
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("gia-vang-update", handleUpdate);

    // Nếu socket chưa kết nối, thử kết nối lại
    if (!socket.connected) {
      console.log("🔄 Đang thử kết nối lại socket...", process.env.NEXT_PUBLIC_SOCKET_URL);
      socket.connect();
    } else {
      console.log("🧠 Socket đã kết nối sẵn:", socket.id);
    }

    // Hủy đăng ký các sự kiện khi component unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("gia-vang-update", handleUpdate);
    };
  }, []);

  return goldPrice;
}
