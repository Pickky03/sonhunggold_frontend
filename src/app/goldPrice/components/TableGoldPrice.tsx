"use client"
import GoldChart from "./Chart"
import { useEffect, useState } from "react"
import FooterCarousel from "./footer"
import { getGoldPrice } from "@/services/EditGoldPriceService"
import LiveClock from "./ClockLive"

type GoldPriceItem = {
  _id: string;
  goldtype: string;
  buyprice: number;
  sellprice: number;
};

export default function TableGoldPrice() {
  const [goldPrice, setGoldPrice] = useState<GoldPriceItem[]>([])

  useEffect(() => {     
    const fetchGoldPrice = async () => {
      const res = await getGoldPrice()
      setGoldPrice(res)
    }
    fetchGoldPrice()
  }, [])

  // Component thẻ giá vàng cho mobile
  const renderMobileCard = (item: GoldPriceItem, index: number) => (
    <div 
      key={item._id ?? index}
      className={`p-3 rounded-lg border border-yellow-400/30 mb-2 ${
        index % 2 === 0 ? "bg-black/20" : "bg-black/10"
      }`}
    >
      <div className="text-center mb-2">
        <h3 className="text-yellow-300 font-bold text-base">{item.goldtype ?? "---"}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-black/20 p-2 rounded-md">
          <p className="text-gray-300 text-xs mb-1">Mua vào:</p>
          <p className="text-white font-semibold text-sm">
            {typeof item.buyprice === "number"
              ? item.buyprice.toLocaleString("vi-VN")
              : "---"}
          </p>
        </div>
        <div className="bg-black/20 p-2 rounded-md">
          <p className="text-gray-300 text-xs mb-1">Bán ra:</p>
          <p className="text-white font-semibold text-sm">
            {typeof item.sellprice === "number"
              ? item.sellprice.toLocaleString("vi-VN")
              : "---"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="text-center bg-black border border-yellow-400/50 py-2">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          <h1 className="text-xl md:text-3xl font-bold mb-1">DOANH NGHIỆP VÀNG BẠC SƠN HÙNG</h1>
        </div>
        <p className="text-yellow-300 text-base md:text-lg font-semibold mb-1">GIỮ TÍN NHIỆM HƠN GIỮ VÀNG</p>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gradient-to-br from-[#a52a2a] to-[#8b0000] p-2 md:p-3 text-white font-sans flex flex-col">
        <div className="bg-yellow-400/10 rounded-lg p-2 border flex flex-col justify-center items-center border-yellow-400/30">
          <p className="text-lg md:text-xl font-bold text-yellow-400 mb-1">BẢNG GIÁ VÀNG HÔM NAY</p>
          <div className="text-xs md:text-sm text-gray-300"><LiveClock/></div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-3 mt-2 flex-grow">
          {/* Price Table - Left Side */}
          <div className="w-full lg:w-[60%] lg:order-1 flex flex-col">
            <div className="bg-black/30 rounded-lg border border-yellow-400/50 overflow-hidden flex-grow">
              {/* Bảng cho desktop và tablet */}
              <div className="hidden sm:block h-full">
                <table className="w-full h-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-yellow-600 to-yellow-500">
                      <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm">LOẠI VÀNG</th>
                      <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm">MUA VÀO</th>
                      <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm">BÁN RA</th>
                    </tr>
                  </thead>
                  <tbody className="h-full">
                    {goldPrice.map((item: GoldPriceItem, index) => (
                      <tr
                        key={item._id ?? index}
                        className={`border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors ${
                          index % 2 === 0 ? "bg-black/20" : "bg-black/10"
                        }`}
                      >
                        <td className="py-1 px-2 text-center text-yellow-300 font-semibold text-xs md:text-sm">
                          {item.goldtype ?? "---"}
                        </td>
                        <td className="py-1 px-2 text-center text-white font-medium text-xs md:text-sm">
                          {typeof item.buyprice === "number"
                            ? item.buyprice.toLocaleString("vi-VN")
                            : "---"}
                        </td>
                        <td className="py-1 px-2 text-center text-white font-medium text-xs md:text-sm">
                          {typeof item.sellprice === "number"
                            ? item.sellprice.toLocaleString("vi-VN")
                            : "---"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card layout cho mobile */}
              <div className="sm:hidden p-2">
                {goldPrice.map(renderMobileCard)}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-2 bg-black/30 rounded-lg border border-yellow-400/30 p-2">
              <p className="text-yellow-400 font-semibold text-center text-xs md:text-sm">
                Đơn vị: 1000 VNĐ/chỉ | Cập nhật liên tục
              </p>
              <p className="text-gray-300 text-center text-xs mt-1">
                * Giá có thể thay đổi theo thời gian thực
              </p>
            </div>
          </div>

          {/* Chart - Right Side */}
          <div className="w-full lg:w-[40%] lg:order-2">
            <div className="bg-black/30 rounded-lg border border-yellow-400/50 p-2 h-full">
              <h3 className="text-yellow-400 font-bold text-base md:text-lg mb-2 text-center">
                BIỂU ĐỒ GIÁ VÀNG THẾ GIỚI (XAU/USD)
              </h3>
              <div className="h-[250px] sm:h-[300px] md:h-[450px]">
                <GoldChart />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <FooterCarousel/>
    </div>
  )
}
