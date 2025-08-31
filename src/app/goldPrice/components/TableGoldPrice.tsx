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
      className={`p-10 rounded-2xl border-4 border-yellow-400/50 mb-6 ${
        index % 2 === 0 ? "bg-black/20" : "bg-black/10"
      }`}
    >
      <div className="text-center mb-6">
        <h3 className="text-yellow-300 font-bold text-5xl lg:text-7xl">{item.goldtype ?? "---"}</h3>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-black/20 p-8 rounded-xl">
          <p className="text-gray-300 text-3xl mb-4">Mua vào:</p>
          <p className="text-white font-semibold text-5xl lg:text-7xl">
            {typeof item.buyprice === "number"
              ? item.buyprice.toLocaleString("vi-VN")
              : "---"}
          </p>
        </div>
        <div className="bg-black/20 p-8 rounded-xl">
          <p className="text-gray-300 text-3xl mb-4">Bán ra:</p>
          <p className="text-white font-semibold text-5xl lg:text-7xl">
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
          <h1 className="text-xl md:text-3xl xl:text-5xl 2xl:text-7xl font-bold mb-1">
            DOANH NGHIỆP VÀNG BẠC SƠN HÙNG
          </h1>
        </div>
        <p className="text-yellow-300 text-base md:text-lg xl:text-2xl 2xl:text-6xl font-semibold mb-1">
          GIỮ TÍN NHIỆM HƠN GIỮ VÀNG
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gradient-to-br from-[#a52a2a] to-[#8b0000] p-2 md:p-3 2xl:p-8 text-white font-sans flex flex-col">
        <div className="bg-yellow-400/10 rounded-lg p-2 2xl:p-6 border flex flex-col justify-center items-center border-yellow-400/30">
          <p className="text-lg md:text-xl xl:text-3xl 2xl:text-6xl font-bold text-yellow-400 mb-1">
            BẢNG GIÁ VÀNG HÔM NAY
          </p>
          <div className="text-xs md:text-sm xl:text-lg 2xl:text-3xl text-gray-300">
            <LiveClock/>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-3 mt-2 flex-grow">
          {/* Price Table - Left Side */}
          <div className="w-full lg:w-[60%] 2xl:w-[65%] lg:order-1 flex flex-col">
            <div className="bg-black/30 rounded-lg border border-yellow-400/50 overflow-hidden flex-grow">
              {/* Bảng cho desktop và tablet */}
              <div className="hidden sm:block h-full">
                <table className="w-full h-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-yellow-600 to-yellow-500">
                      <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm xl:text-3xl 2xl:text-7xl">LOẠI VÀNG</th>
                      <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm xl:text-3xl 2xl:text-7xl">MUA VÀO</th>
                      <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm xl:text-3xl 2xl:text-7xl">BÁN RA</th>
                    </tr>
                  </thead>
                  <tbody className="h-full">
                    {goldPrice.map((item: GoldPriceItem, index) => (
                      <tr
                        key={item._id ?? index}
                        className={`border-b-4 border-yellow-400/40 hover:bg-yellow-400/10 transition-colors ${
                          index % 2 === 0 ? "bg-black/20" : "bg-black/10"
                        }`}
                      >
                        <td className="py-1 px-2 text-center text-yellow-300 font-semibold text-xs md:text-sm xl:text-3xl 2xl:text-7xl">
                          {item.goldtype ?? "---"}
                        </td>
                        <td className="py-1 px-2 text-center text-white font-medium text-xs md:text-sm xl:text-3xl 2xl:text-7xl">
                          {typeof item.buyprice === "number"
                            ? item.buyprice.toLocaleString("vi-VN")
                            : "---"}
                        </td>
                        <td className="py-1 px-2 text-center text-white font-medium text-xs md:text-sm xl:text-3xl 2xl:text-7xl">
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
            <div className="mt-2 bg-black/30 rounded-lg border border-yellow-400/30 p-2 2xl:p-6">
              <p className="text-yellow-400 font-semibold text-center text-xs md:text-sm xl:text-lg 2xl:text-3xl">
                Đơn vị: 1000 VNĐ/chỉ | Cập nhật liên tục
              </p>
              <p className="text-gray-300 text-center text-xs mt-1 xl:text-lg 2xl:text-2xl">
                * Giá có thể thay đổi theo thời gian thực
              </p>
            </div>
          </div>

          {/* Chart - Right Side */}
          <div className="w-full lg:w-[40%] 2xl:w-[35%]  lg:order-2">
            <div className="bg-black/30 rounded-lg border border-yellow-400/50 p-2 2xl:p-4 h-full flex flex-col items-center">
              <h3 className="text-yellow-400 font-bold text-base md:text-lg xl:text-2xl 2xl:text-4xl mb-2 text-center">
                BIỂU ĐỒ GIÁ VÀNG THẾ GIỚI (XAU/USD)
              </h3>
              <div className="h-[250px] sm:h-[300px] md:h-[450px] 2xl:h-[550px] w-full">
                <GoldChart />
              </div>
              {/* Chỉ hiển thị ở màn hình 2xl */}
              <div className="hidden 2xl:block mt-4 w-full justify-center">
                <img
                  src="/neko.gif"
                  alt="neko"
                  className="w-[650px] h-auto border-r-8" // tăng kích thước gif
                />
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
