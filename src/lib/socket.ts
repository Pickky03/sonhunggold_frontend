// src/lib/socket.ts
import { io } from "socket.io-client";

// Xác định URL socket server - sử dụng biến môi trường đã cấu hình
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

// Cấu hình socket với nhiều tùy chọn để đảm bảo kết nối ổn định
const socketOptions = {
  path: "/socket.io",
  transports: ["polling", "websocket"], // fallback luôn được bật
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: true,
  forceNew: false,
  withCredentials: false,
};

console.log('🔌 Kết nối socket tới:', SOCKET_URL);

// Tạo instance socket
const socket = io(SOCKET_URL, socketOptions);

// Xử lý các sự kiện kết nối
socket.on('connect', () => {
  console.log('✅ Socket kết nối thành công:', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('❌ Lỗi kết nối socket:', error.message);
});

socket.on('disconnect', (reason) => {
  console.log('⚠️ Socket ngắt kết nối:', reason);
  
  // Thử kết nối lại nếu ngắt kết nối không phải do client chủ động ngắt
  if (reason !== 'io client disconnect') {
    console.log('🔄 Đang thử kết nối lại...');
  }
});

// Đảm bảo socket được kết nối
if (!socket.connected) {
  console.log('🔄 Socket chưa kết nối, đang kết nối...');
  socket.connect();
}

socket.on("connect", () => {
  const transport = socket.io.engine.transport.name;
  alert(`✅ Kết nối socket thành công!\nID: ${socket.id}\nTransport: ${transport}`);
});

socket.on("connect_error", (err) => {
  alert(`❌ Không kết nối socket được:\n${err.message}`);
});

socket.on("disconnect", (reason) => {
  alert(`⚠️ Mất kết nối socket:\n${reason}`);
});

export default socket;
