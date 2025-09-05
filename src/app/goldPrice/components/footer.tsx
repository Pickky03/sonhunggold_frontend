import Marquee from "react-fast-marquee";
import useGiaVangSocket from "@/hooks/useGiaVangSocket";

export default function FooterCarousel() {
  const goldPrice = useGiaVangSocket();



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
