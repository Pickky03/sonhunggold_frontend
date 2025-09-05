import Marquee from "react-fast-marquee";
import { getGoldPrice } from '@/services/EditGoldPriceService';
import { useEffect, useState } from "react";
import useGiaVangSocket, { GoldPriceItem } from "@/hooks/useGiaVangSocket";

export default function FooterCarousel() {
  const [initialData, setInitialData] = useState<GoldPriceItem[]>([]);
  const goldPrice = useGiaVangSocket();

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const res = await getGoldPrice();
        console.log('Footer: Fetched gold price:', res);
        if (Array.isArray(res) && res.length > 0) {
          setInitialData(res);
        } else {
          console.warn('Footer: Received empty or invalid gold price data:', res);
        }
      } catch (error) {
        console.error('Footer: Error in fetchGoldPrice:', error);
      }
    };
    fetchGoldPrice();
  }, []);

  return (
    <Marquee gradient={false} speed={50} className="bg-black text-white py-4 text-lg">
      {goldPrice.length > 0 ? (
        goldPrice.map((item) => (
          <span key={item._id} className="mx-4">
            🌟 {item.goldtype}: Mua vào: {item.buyprice.toLocaleString()} VNĐ | Bán ra: {item.sellprice.toLocaleString()} VNĐ 🌟
          </span>
        ))
      ) : (
        <span>Đang tải giá vàng...</span>
      )}
    </Marquee>
  );
}
