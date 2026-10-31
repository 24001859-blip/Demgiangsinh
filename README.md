# 🎄 Cây Thông Điều Ước (Christmas Wish Tree 2D)

Website Giáng sinh 2D phong cách **Pixel Art** ấm áp, nơi người dùng chọn sứ giả Giáng sinh (Ông già Noel, Tuần lộc, Người tuyết, Yêu tinh), viết thiệp điều ước và ngắm nhìn nhân vật tự di chuyển đến cây thông treo thiệp cùng hiệu ứng lấp lánh.

## ✨ Tính năng chính (Phiên bản MVP)
- **Cây thông Noel 2D Pixel Art trung tâm**: Nhiều tầng lá phủ tuyết, ngôi sao đỉnh cây phát sáng, đèn LED nhấp nháy, hộp quà dưới gốc cây và hiệu ứng tuyết rơi nhẹ.
- **4 Nhân vật sứ giả 2D**:
  - 🎅 **Ông Già Noel** (`santa`)
  - 🦌 **Tuần Lộc Rudolph** (`reindeer`)
  - ⛄ **Người Tuyết Frosty** (`snowman`)
  - 🧝 **Yêu Tinh Noel** (`elf`)
- **Hoạt ảnh treo thiệp 3 giai đoạn**:
  1. Nhân vật cầm tấm thiệp chạy từ trạm sứ giả đến gốc cây thông.
  2. Bật nhảy lên cành thông và gắn tấm thiệp vào tán lá.
  3. Hiệu ứng nổ hạt lấp lánh (`Sparkles`) quanh tấm thiệp vừa treo.
- **Đọc thiệp & Chế độ Công khai / Riêng tư (Demo `localStorage`)**:
  - Bấm vào bất kỳ tấm thiệp nào trên cây để mở xem nội dung.
  - Hỗ trợ chọn lời chúc **Công khai** hoặc **Riêng tư** (kèm mã bí mật & liên kết cục bộ `?wish=<id>&key=<secretKey>` để mô phỏng luồng mở khóa).
  - *Lưu ý minh bạch*: Phiên bản MVP hiện lưu dữ liệu trên `localStorage` của trình duyệt trên một thiết bị để phục vụ demo, chưa bao gồm backend lưu trữ đa thiết bị hay kiểm soát truy cập phía máy chủ.

## 🛠️ Công nghệ sử dụng
- **React 18 + Vite + TypeScript**
- **SVG 2D Pixel Art & CSS Animations** (không phụ thuộc hình ảnh bản quyền bên ngoài)
- **LocalStorage API** (lưu trữ dữ liệu demo cục bộ)

## 🚀 Hướng dẫn cài đặt và chạy Website

### Yêu cầu môi trường
- **Node.js** (phiên bản 18+ hoặc LTS) và **npm**.

### Các bước chạy trên máy
1. **Clone repository về máy:**
   ```bash
   git clone https://github.com/24001859-blip/Demgiangsinh.git
   cd Demgiangsinh
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy server phát triển (Development):**
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt tại địa chỉ `http://localhost:5173/`.

4. **Kiểm tra TypeScript và Build bản Production:**
   ```bash
   npm run build
   npm run preview
   ```
