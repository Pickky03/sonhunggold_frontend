import { io, Socket } from "socket.io-client";
import { SOCKET_CONFIG } from "@/config/socketConfig";

// Định nghĩa kiểu dữ liệu cho giá vàng
export interface GoldPriceData {
  _id: string;
  goldtype: string;
  buyprice: number;
  sellprice: number;
  updatedAt?: string;
}

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_CONFIG.url, {
      ...SOCKET_CONFIG.options,
      auth: {
        token: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
      },
    });

    // Lắng nghe sự kiện kết nối
    socket.on("connect", () => {
      console.log("Đã kết nối đến server Socket.IO, Socket ID:", socket?.id);
    });

    // Xử lý khi mất kết nối
    socket.on("disconnect", () => {
      console.log("Đã ngắt kết nối từ server Socket.IO");
    });

    // Xử lý lỗi kết nối
    socket.on("connect_error", (error) => {
      console.error("Lỗi kết nối Socket.IO:", error);
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

// Các hàm tiện ích để tương tác với socket
export const subscribeToGoldPriceUpdates = (callback: (data: GoldPriceData) => void) => {
  const socket = getSocket();
  socket.on("goldPrice:update", callback);
  return () => {
    socket.off("goldPrice:update", callback);
  };
};

export const subscribeToNewGoldPrice = (callback: (data: GoldPriceData) => void) => {
  const socket = getSocket();
  socket.on("goldPrice:create", callback);
  return () => {
    socket.off("goldPrice:create", callback);
  };
};

export const requestAllGoldPrices = () => {
  const socket = getSocket();
  socket.emit("goldPrice:getAll");
};

export const subscribeToGoldPriceList = (callback: (data: GoldPriceData[]) => void) => {
  const socket = getSocket();
  socket.on("goldPrice:list", callback);
  return () => {
    socket.off("goldPrice:list", callback);
  };
};
