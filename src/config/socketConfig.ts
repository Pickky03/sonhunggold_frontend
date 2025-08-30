/**
 * Cấu hình Socket.IO
 * 
 * Hướng dẫn sử dụng:
 * 1. Tạo file .env.local trong thư mục gốc dự án
 * 2. Thêm biến môi trường NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
 * 3. Nếu không có biến môi trường, URL mặc định sẽ được sử dụng
 */

export const SOCKET_CONFIG = {
  url: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000',
  options: {
    withCredentials: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true
  }
};
