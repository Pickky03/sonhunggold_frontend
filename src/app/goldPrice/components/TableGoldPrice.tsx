"use client"

import mockTableGoldPrice from "@/utils/mockTableGoldPrice"
import GoldChart from "./Chart"
import { useEffect, useState } from "react"
import FooterCarousel from "./footer"
export default function TableGoldPrice() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"]
    const day = days[date.getDay()]
    const dateNum = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")

    return `${day}, Ngày ${dateNum} Tháng ${month} Năm ${year} | ${hours}:${minutes}:${seconds}`
  }

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
          <p className="text-xs md:text-sm text-gray-300">{formatDate(currentDateTime)}</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-3 mt-2 flex-grow">
          {/* Price Table - Left Side */}
          <div className="w-full lg:w-[40%] lg:order-1 flex flex-col">
            <div className="bg-black/30 rounded-lg border border-yellow-400/50 overflow-hidden flex-grow">
              <table className="w-full h-full">
                <thead>
                  <tr className="bg-gradient-to-r from-yellow-600 to-yellow-500">
                    <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm">LOẠI VÀNG</th>
                    <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm">MUA VÀO</th>
                    <th className="py-2 px-2 text-center text-black font-bold text-xs md:text-sm">BÁN RA</th>
                  </tr>
                </thead>
                <tbody className="h-full">
                  {mockTableGoldPrice.map((item, index) => (
                    <tr
                      key={item.key}
                      className={`border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors ${
                        index % 2 === 0 ? "bg-black/20" : "bg-black/10"
                      }`}
                    >
                      <td className="py-1 px-2 text-center text-yellow-300 font-semibold text-xs md:text-sm">
                        {item.goldType}
                      </td>
                      <td className="py-1 px-2 text-center text-white font-medium text-xs md:text-sm">
                        {item.buyPrice.toLocaleString("vi-VN")}
                      </td>
                      <td className="py-1 px-2 text-center text-white font-medium text-xs md:text-sm">
                        {item.sellPrice.toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          <div className="w-full lg:w-[60%] lg:order-2">
            <div className="bg-black/30 rounded-lg border border-yellow-400/50 p-2 h-full">
              <h3 className="text-yellow-400 font-bold text-base md:text-lg mb-2 text-center">
                BIỂU ĐỒ GIÁ VÀNG THẾ GIỚI (XAU/USD)
              </h3>
              <div className="h-[300px] md:h-[350px]">
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
