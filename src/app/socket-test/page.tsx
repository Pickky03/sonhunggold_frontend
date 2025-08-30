"use client"

import { useEffect, useState } from "react"
import { 
  initSocket, 
  disconnectSocket, 
  subscribeToGoldPriceUpdates,
  subscribeToNewGoldPrice,
  requestAllGoldPrices,
  subscribeToGoldPriceList,
  GoldPriceData
} from "@/services/SocketService"
import { SOCKET_CONFIG } from "@/config/socketConfig"

export default function SocketTestPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [socketId, setSocketId] = useState<string | null>(null)
  const [goldPrices, setGoldPrices] = useState<GoldPriceData[]>([])
  const [lastEvent, setLastEvent] = useState<{type: string, data?: unknown}>()
  const [logs, setLogs] = useState<string[]>([])

  // Hàm để thêm log
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)])
  }

  useEffect(() => {
    // Khởi tạo kết nối socket
    const socket = initSocket()
    
    // Lắng nghe sự kiện kết nối
    socket.on("connect", () => {
      setIsConnected(true)
      if (socket.id) {
        setSocketId(socket.id)
        addLog(`Đã kết nối đến server Socket.IO, Socket ID: ${socket.id}`)
      }
    })

    // Lắng nghe sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      setIsConnected(false)
      setSocketId(null)
      addLog("Đã ngắt kết nối từ server Socket.IO")
    })

    // Lắng nghe sự kiện lỗi kết nối
    socket.on("connect_error", (error) => {
      addLog(`Lỗi kết nối: ${error.message}`)
    })

    // Lắng nghe sự kiện chào mừng từ server
    socket.on("welcome", (data) => {
      addLog(`Tin nhắn chào mừng: ${data.message}`)
      setLastEvent({type: "welcome", data})
    })

    // Lắng nghe danh sách giá vàng
    const unsubscribeList = subscribeToGoldPriceList((data) => {
      addLog(`Nhận danh sách giá vàng: ${data.length} mục`)
      setGoldPrices(data)
      setLastEvent({type: "goldPrice:list", data})
    })

    // Lắng nghe cập nhật giá vàng
    const unsubscribeUpdate = subscribeToGoldPriceUpdates((updatedGoldPrice) => {
      addLog(`Giá vàng được cập nhật: ${updatedGoldPrice.goldtype}`)
      setGoldPrices(prev => 
        prev.map(price => 
          price._id === updatedGoldPrice._id ? updatedGoldPrice : price
        )
      )
      setLastEvent({type: "goldPrice:update", data: updatedGoldPrice})
    })

    // Lắng nghe giá vàng mới
    const unsubscribeNew = subscribeToNewGoldPrice((newGoldPrice) => {
      addLog(`Giá vàng mới được tạo: ${newGoldPrice.goldtype}`)
      setGoldPrices(prev => [...prev, newGoldPrice])
      setLastEvent({type: "goldPrice:create", data: newGoldPrice})
    })

    // Dọn dẹp khi component unmount
    return () => {
      unsubscribeList()
      unsubscribeUpdate()
      unsubscribeNew()
      disconnectSocket()
    }
  }, [])

  // Hàm yêu cầu danh sách giá vàng
  const handleRequestGoldPrices = () => {
    addLog("Đang yêu cầu danh sách giá vàng...")
    requestAllGoldPrices()
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kiểm tra kết nối Socket.IO</h1>
      
      {/* Thông tin kết nối */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Thông tin kết nối</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><span className="font-medium">URL Socket:</span> {SOCKET_CONFIG.url}</p>
            <p>
              <span className="font-medium">Trạng thái:</span>{" "}
              <span className={`font-semibold ${isConnected ? "text-green-600" : "text-red-600"}`}>
                {isConnected ? "Đã kết nối" : "Chưa kết nối"}
              </span>
            </p>
          </div>
          <div>
            <p><span className="font-medium">Socket ID:</span> {socketId || "---"}</p>
            <p><span className="font-medium">withCredentials:</span> {SOCKET_CONFIG.options.withCredentials ? "Có" : "Không"}</p>
          </div>
        </div>
      </div>

      {/* Điều khiển */}
      <div className="mb-6">
        <button 
          onClick={handleRequestGoldPrices}
          disabled={!isConnected}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Yêu cầu danh sách giá vàng
        </button>
      </div>

      {/* Sự kiện gần nhất */}
      {lastEvent && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Sự kiện gần nhất</h2>
          <p><span className="font-medium">Loại sự kiện:</span> {lastEvent.type}</p>
          <div className="mt-2">
            <p className="font-medium">Dữ liệu:</p>
            <pre className="bg-gray-100 p-2 rounded-md overflow-auto max-h-40 text-sm">
              {JSON.stringify(lastEvent.data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Danh sách giá vàng */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Danh sách giá vàng</h2>
        {goldPrices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Loại vàng</th>
                  <th className="py-2 px-4 border-b">Giá mua</th>
                  <th className="py-2 px-4 border-b">Giá bán</th>
                  <th className="py-2 px-4 border-b">Cập nhật lúc</th>
                </tr>
              </thead>
              <tbody>
                {goldPrices.map((gold) => (
                  <tr key={gold._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{gold.goldtype}</td>
                    <td className="py-2 px-4 border-b text-right">{gold.buyprice.toLocaleString("vi-VN")} VND</td>
                    <td className="py-2 px-4 border-b text-right">{gold.sellprice.toLocaleString("vi-VN")} VND</td>
                    <td className="py-2 px-4 border-b">
                      {gold.updatedAt ? new Date(gold.updatedAt).toLocaleString("vi-VN") : "---"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Chưa có dữ liệu giá vàng</p>
        )}
      </div>

      {/* Nhật ký kết nối */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Nhật ký kết nối</h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="mb-1">{log}</div>
            ))
          ) : (
            <p className="text-gray-500">Chưa có nhật ký</p>
          )}
        </div>
      </div>
    </div>
  )
}
