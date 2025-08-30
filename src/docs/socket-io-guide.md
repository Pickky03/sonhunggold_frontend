# Hướng dẫn sử dụng Socket.IO trong dự án

Tài liệu này hướng dẫn cách sử dụng Socket.IO để nhận cập nhật giá vàng realtime từ server.

## Cấu trúc tích hợp Socket.IO

Dự án đã được tích hợp Socket.IO với các thành phần sau:

1. **Cấu hình Socket.IO**: `src/config/socketConfig.ts`
2. **Service Socket.IO**: `src/services/SocketService.ts`
3. **Tích hợp vào component**: `src/app/goldPrice/components/TableGoldPrice.tsx`
4. **Trang kiểm tra Socket.IO**: `src/app/socket-test/page.tsx`

## Cấu hình Socket.IO

File cấu hình `src/config/socketConfig.ts` chứa các thông số kết nối Socket.IO:

```typescript
export const SOCKET_CONFIG = {
  url: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
  options: {
    withCredentials: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
  },
};
```

Để thay đổi URL kết nối, bạn có thể:

1. Tạo file `.env.local` tại thư mục gốc dự án
2. Thêm biến môi trường `NEXT_PUBLIC_SOCKET_URL=http://your-server-url`

## Service Socket.IO

File `src/services/SocketService.ts` cung cấp các hàm để tương tác với Socket.IO:

### Các hàm chính:

1. **initSocket()**: Khởi tạo kết nối Socket.IO
2. **disconnectSocket()**: Ngắt kết nối Socket.IO
3. **getSocket()**: Lấy đối tượng socket hiện tại hoặc khởi tạo nếu chưa có
4. **subscribeToGoldPriceUpdates(callback)**: Đăng ký lắng nghe cập nhật giá vàng
5. **subscribeToNewGoldPrice(callback)**: Đăng ký lắng nghe giá vàng mới
6. **requestAllGoldPrices()**: Yêu cầu danh sách giá vàng
7. **subscribeToGoldPriceList(callback)**: Đăng ký lắng nghe danh sách giá vàng

### Cách sử dụng trong component:

```typescript
import {
  initSocket,
  disconnectSocket,
  subscribeToGoldPriceUpdates,
  subscribeToNewGoldPrice,
  requestAllGoldPrices,
  subscribeToGoldPriceList,
  GoldPriceData,
} from "@/services/SocketService";

// Trong component React
useEffect(() => {
  // Khởi tạo kết nối
  const socket = initSocket();

  // Đăng ký lắng nghe danh sách giá vàng
  const unsubscribeList = subscribeToGoldPriceList((data) => {
    console.log("Nhận danh sách giá vàng:", data);
    setGoldPrices(data);
  });

  // Yêu cầu danh sách giá vàng
  requestAllGoldPrices();

  // Dọn dẹp khi component unmount
  return () => {
    unsubscribeList();
    disconnectSocket();
  };
}, []);
```

## Các sự kiện Socket.IO

### Sự kiện từ server:

1. **connect**: Khi kết nối thành công đến server
2. **disconnect**: Khi mất kết nối với server
3. **connect_error**: Khi có lỗi kết nối
4. **welcome**: Tin nhắn chào mừng từ server
5. **goldPrice:list**: Danh sách giá vàng
6. **goldPrice:update**: Cập nhật giá vàng
7. **goldPrice:create**: Giá vàng mới được tạo

### Sự kiện gửi đến server:

1. **goldPrice:getAll**: Yêu cầu danh sách giá vàng

## Kiểm tra kết nối Socket.IO

Bạn có thể truy cập trang `/socket-test` để kiểm tra kết nối Socket.IO. Trang này hiển thị:

1. Thông tin kết nối
2. Trạng thái kết nối
3. Danh sách giá vàng
4. Nhật ký kết nối
5. Sự kiện gần nhất

## Xử lý lỗi kết nối

Service Socket.IO đã được cấu hình để tự động kết nối lại khi mất kết nối. Nếu không thể kết nối đến server Socket.IO, component sẽ sử dụng API thông thường để lấy dữ liệu.

## Lưu ý bảo mật

Socket.IO đã được cấu hình để gửi token xác thực trong quá trình kết nối:

```typescript
socket = io(SOCKET_CONFIG.url, {
  ...SOCKET_CONFIG.options,
  auth: {
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null,
  },
});
```

## Tùy chỉnh thêm

Nếu bạn cần thêm các sự kiện Socket.IO khác, bạn có thể mở rộng file `src/services/SocketService.ts` bằng cách thêm các hàm mới tương tự như các hàm hiện có.
