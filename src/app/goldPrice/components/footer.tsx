import Marquee from "react-fast-marquee";
import { getGoldPrice } from '@/services/EditGoldPriceService';
import { useEffect, useState } from "react";

export default function FooterCarousel() {
  type GoldPriceItem = {
    _id: string;
    goldtype: string;
    buyprice: number;
    sellprice: number;
  };

  const [goldPrice, setGoldPrice] = useState<GoldPriceItem[]>([]);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      const res = await getGoldPrice();
      setGoldPrice(res);
    };
    fetchGoldPrice();
  }, []);

  return (
    <Marquee gradient={false} speed={50} className="bg-black text-yellow-300 py-2 text-sm">
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
