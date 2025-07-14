import Marquee from "react-fast-marquee";

export default function FooterCarousel() {
  return (
    <Marquee gradient={false} speed={50} className="bg-black text-yellow-300 py-2 text-sm">
      🌟 Giá vàng SJC: 67.500.000 VNĐ | Bán ra: 68.000.000 VNĐ | Nhẫn 24K: 55.500.000 VNĐ 🌟
    </Marquee>
  );
}
