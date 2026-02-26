# Hướng Dẫn Cài Đặt & Chạy Hệ Thống Quản Lý Nhà Máy Vải Sợi

## Bước 1: Tải Xuống Code từ v0

### Cách A: Download ZIP (Nhanh nhất)
1. Trên trang v0.app, bạn sẽ thấy nút **"Download ZIP"** ở góc trên bên phải
2. Nhấp vào để tải xuống dự án dưới dạng file ZIP
3. Giải nén file ZIP vào thư mục bạn muốn (ví dụ: `C:\Projects\` hoặc `~/Documents/`)

### Cách B: Sử dụng GitHub (Nếu có repository)
```bash
git clone <repository-url>
cd v0-project
```

## Bước 2: Cài Đặt Node.js

Nếu bạn chưa cài Node.js, hãy tải từ: https://nodejs.org/

**Khuyến nghị:** LTS (Long Term Support) hoặc phiên bản 18.0+

Kiểm tra cài đặt:
```bash
node --version
npm --version
# hoặc
pnpm --version
```

## Bước 3: Cài Đặt Dependencies

Mở Terminal/PowerShell tại thư mục dự án và chạy:

### Nếu sử dụng npm:
```bash
npm install
```

### Nếu sử dụng pnpm (Nhanh hơn):
```bash
pnpm install
```

Đợi quá trình cài đặt hoàn tất (2-5 phút tùy tốc độ internet)

## Bước 4: Chạy Development Server

Chạy lệnh:
```bash
npm run dev
# hoặc
pnpm dev
```

Kết quả sẽ hiển thị:
```
> next dev

  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local

```

## Bước 5: Truy Cập Ứng Dụng

Mở trình duyệt web và truy cập:
```
http://localhost:3000
```

Trang chủ sẽ hiển thị giao diện Quản Lý Nhà Máy Vải Sợi!

## Các Lệnh Hữu Ích

### Xây Dựng Cho Production:
```bash
npm run build
npm run start
```

### Kiểm Tra Lỗi Code:
```bash
npm run lint
```

### Dừng Server:
Nhấn `Ctrl + C` trong Terminal

## Xử Lý Sự Cố Thường Gặp

### 1. Lỗi "Port 3000 đã được sử dụng"
Nếu port 3000 đã bận, dùng port khác:
```bash
npm run dev -- -p 3001
```
Sau đó truy cập `http://localhost:3001`

### 2. Lỗi "Cannot find module"
Xóa thư mục node_modules và cài lại:
```bash
rm -rf node_modules
npm install
```

### 3. Lỗi "npm: command not found"
Đảm bảo Node.js đã được cài đặt đúng. Khởi động lại Terminal/PowerShell.

### 4. Ứng dụng không hiển thị đúng styling
Xóa cache và làm mới:
```bash
rm -rf .next
npm run dev
```
Sau đó nhấn `Ctrl + F5` trong trình duyệt (xóa cache)

## Cấu Hình Tùy Chỉnh

### Thay Đổi Port Mặc Định
Tạo file `.env.local`:
```
PORT=8000
```

### Chế Độ Tối/Sáng
Ứng dụng mặc định sử dụng dark theme. Để thay đổi, chỉnh sửa file `app/globals.css`

## Cấu Trúc Dự Án

```
v0-project/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Trang chính
│   └── globals.css         # Styling toàn cục
├── components/
│   ├── MainLayout.tsx      # Layout chính
│   ├── views/              # 7 views chính
│   └── ...
├── hooks/
│   └── useFactoryData.ts   # Mock dữ liệu
├── public/                 # Assets tĩnh
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── tailwind.config.ts      # Tailwind config
```

## Tính Năng Chính

Sau khi chạy, bạn sẽ có access đến:

1. **Bảng Điều Khiển** - KPI thời gian thực & chi tiết máy
2. **Phân Tích** - Biểu đồ & phân tích lỗi chi tiết
3. **Quản Lý Nhân Sự** - Lương tự động + điều chỉnh giá công
4. **Trộn Cotton** - AI dự đoán chất lượng
5. **Quản Lý Năng Lượng** - Tiêu thụ theo ngày + điều khiển HVAC
6. **Bảo Trì** - Lịch bảo trì với workflow chi tiết
7. **Chất Lượng** - Tiêu chuẩn & phân loại lỗi

## Dữ Liệu Mock

Hệ thống sử dụng dữ liệu giả lập:
- **10 máy xoắn** với trạng thái & sản lượng thời gian thực
- **10 nhân viên** với lương tính động
- **10 đơn hàng** sản xuất
- **10 công việc bảo trì**
- Dữ liệu cập nhật mỗi 3-5 giây

Tất cả dữ liệu sẽ reset khi tải lại trang. Để lưu trữ dữ liệu, bạn cần kết nối backend thực (database).

## Hướng Dẫn Kết Nối Backend

Hiện tại, dữ liệu được quản lý bằng `hooks/useFactoryData.ts`. Để kết nối backend thực:

1. Tạo API routes trong `app/api/`
2. Cập nhật `useFactoryData.ts` để gọi API
3. Thay thế useState bằng fetch hoặc SWR

## Liên Hệ & Hỗ Trợ

Nếu gặp vấn đề:
- Kiểm tra lại các bước cài đặt trên
- Đảm bảo Node.js phiên bản 18+
- Thử xóa node_modules và cài lại
- Kiểm tra tường lửa/antivirus không chặn port 3000

## Phiên Bản

- **Phiên bản ứng dụng**: 1.1
- **Node.js tối thiểu**: 18.0
- **NPM tối thiểu**: 9.0
- **TypeScript**: 5.7.3

---

**Chúc bạn sử dụng hệ thống thành công!** 🎉
