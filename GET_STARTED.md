# Hệ Thống Quản Lý Nhà Máy Vải Sợi - Hướng Dẫn Bắt Đầu

## Tóm Tắt Dự Án

Đây là một **nền tảng quản lý nhà máy vải sợi** hoàn chỉnh với:
- ✅ 7 views chức năng (Dashboard, Analytics, HR-KPI, Cotton Mixing, Energy, Maintenance, Quality)
- ✅ 100% giao diện tiếng Việt
- ✅ Backend simulation tương tác (Dialog, Modal, Form, Slider)
- ✅ Dữ liệu mock cập nhật thời gian thực (3-5 giây)
- ✅ UI/UX chuyên nghiệp với Tailwind CSS + Recharts

## Yêu Cầu Hệ Thống

- **Node.js**: 18.0 hoặc cao hơn
- **NPM** hoặc **pnpm**: Để cài dependencies
- **Trình duyệt**: Chrome, Firefox, Safari (bất kỳ phiên bản gần đây)
- **Bộ nhớ**: Tối thiểu 1GB RAM
- **Ổ cứng**: Tối thiểu 500MB dung lượng trống

## Hướng Dẫn Cài Đặt (3 Bước)

### Bước 1: Tải Xuống Code
1. Trên v0.app, nhấp nút **"Download ZIP"** ở góc trên bên phải
2. Giải nén file vào thư mục bất kỳ (ví dụ: `C:\Projects\` hoặc `~/Documents/`)

### Bước 2: Cài Đặt Dependencies
```bash
# Vào thư mục dự án
cd path/to/v0-project

# Cài đặt (chọn 1)
npm install
# hoặc
pnpm install
```
⏳ Đợi 2-5 phút cho quá trình cài đặt hoàn tất

### Bước 3: Chạy Server
```bash
# Chạy development server
npm run dev
# hoặc
pnpm dev
```

Kết quả:
```
✔ Ready in 2.1s
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### Bước 4: Truy Cập Ứng Dụng
Mở trình duyệt, truy cập:
```
http://localhost:3000
```

🎉 **Xong! Ứng dụng đã chạy.**

---

## Cấu Trúc Thư Mục

```
v0-project/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Trang chính
│   └── globals.css             # Global styles
├── components/
│   ├── MainLayout.tsx          # Layout chính + Sidebar
│   ├── MachineCard.tsx         # Card máy
│   ├── MachineDetailDialog.tsx # Chi tiết máy
│   ├── WorstMachineDetailDialog.tsx
│   ├── KPICard.tsx
│   ├── StatusBadge.tsx
│   └── views/ (7 views chính)
│       ├── Dashboard.tsx
│       ├── Analytics.tsx
│       ├── HRKPIView.tsx          # Quản lý nhân sự
│       ├── CottonMixingView.tsx   # Trộn cotton
│       ├── EnergyManagementView.tsx
│       ├── MaintenanceView.tsx    # Bảo trì
│       └── QualityManagementView.tsx
├── hooks/
│   └── useFactoryData.ts       # Mock data & logic
├── public/                     # Assets tĩnh
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind config
├── README.md                  # Tài liệu đầy đủ
├── INSTALLATION.md            # Chi tiết cài đặt
├── QUICK_START.md             # Bắt đầu nhanh
└── GET_STARTED.md             # File này
```

---

## 7 Views Chức Năng

### 1. **Bảng Điều Khiển (Dashboard)**
- KPI thời gian thực (sản lượng, máy, lỗi)
- 10 máy xoắn với trạng thái động
- Click máy → Xem chi tiết (Thông tin, Chỉ số kỹ thuật, Lịch sử 24h)
- Cảnh báo gần đây

### 2. **Phân Tích (Analytics)**
- Biểu đồ xu hướng sản lượng 24h
- Phân bố trạng thái máy (Pie chart)
- Top 10 máy lỗi cao
- Click "Chi Tiết" → Xem phân loại lỗi chi tiết + lịch sử 7 ngày

### 3. **Quản Lý Nhân Sự & KPI (HR-KPI)** ⭐
- 4 Khối chức năng:
  1. **Lịch Làm Việc** - Dropdown thay đổi ca & máy giám sát
  2. **Cấu Hình Đơn Giá** - Tính lương tự động
  3. **Machine Operation Record** - Sản lượng real-time + lương tính động
  4. **Production Query** - Top 5 nhân viên xuất sắc (Ranking)

### 4. **Trộn Cotton (Cotton Mixing)**
- Tạo lô trộn mới (Loại, Tỉ Lệ, Nhiệt Độ, Tốc Độ)
- Click "Chi Tiết" → Xem dự đoán AI, Phân tích, Rủi ro

### 5. **Quản Lý Năng Lượng (Energy Management)**
- Chọn ngày/tháng/năm
- Slider giới hạn công suất (300-800 kW)
- Click "Xem Chi Tiết" → Modal tiêu thụ theo giờ (24h)
- Điều khiển HVAC (Nhiệt độ, Chế độ)

### 6. **Bảo Trì (Maintenance)**
- Lịch bảo trì máy
- Click "Chi Tiết" → Xem thông tin đầy đủ
- Workflow: Bắt Đầu → Hoàn Thành (với báo cáo)
- Ứng dụng di động mô phỏng

### 7. **Quản Lý Chất Lượng (Quality Management)**
- Tiêu chuẩn chất lượng
- Danh sách đơn hàng
- Click "Chi Tiết" → Xem chỉ số chi tiết (4 metrics), phân loại lỗi

---

## Dữ Liệu Mock

Hệ thống cung cấp 6 bộ dữ liệu mock:
- **10 máy xoắn** - Trạng thái thời gian thực (Cập nhật mỗi 3-5 giây)
- **10 nhân viên** - Sản lượng & lương tính động
- **10 lô trộn** - Với dự đoán chất lượng AI
- **10 đơn hàng** - Sản xuất với tiến độ
- **10 công việc bảo trì** - Với trạng thái workflow
- **10 máy lỗi cao** - Với phân loại lỗi chi tiết

**Lưu ý:** Dữ liệu sẽ reset khi tải lại trang (không lưu trữ).

---

## Hành Động Backend Tương Tác

✅ **Dialog/Modal chi tiết** - Cho tất cả hành động
✅ **Form báo cáo** - Bảo trì, chất lượng với ghi chú
✅ **Slider & Input** - Giá công, nhiệt độ, công suất
✅ **Date picker** - Xem dữ liệu theo ngày/tháng/năm
✅ **Dropdown** - Thay đổi ca, máy, chế độ HVAC
✅ **Real-time updates** - Sản lượng, lương, tiêu thụ năng lượng
✅ **Tính toán tự động** - Lương, dự đoán AI, tiêu thụ

---

## Các Lệnh Hữu Ích

```bash
# Chạy development
npm run dev

# Build cho production
npm run build

# Chạy production build
npm run start

# Kiểm tra lỗi code
npm run lint

# Dừng server
Ctrl + C
```

---

## Xử Lý Sự Cố

### Port 3000 đã bận?
```bash
npm run dev -- -p 3001
# Truy cập: http://localhost:3001
```

### Lỗi "Cannot find module"?
```bash
rm -rf node_modules
npm install
```

### Styling không đúng?
1. Xóa cache: `rm -rf .next`
2. Chạy lại: `npm run dev`
3. Browser: Nhấn `Ctrl + Shift + Delete` (xóa cache)

### Node.js chưa cài?
Tải từ: https://nodejs.org/ (chọn LTS)

---

## Công Nghệ Sử Dụng

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|-----------|---------|
| React | 19.2.4 | Frontend framework |
| Next.js | 16.1.6 | Full-stack framework |
| TypeScript | 5.7.3 | Type safety |
| Tailwind CSS | 4.2.0 | Styling |
| Recharts | 2.15.0 | Biểu đồ |
| Lucide React | 0.564.0 | Icons |
| Shadcn/ui | Latest | UI components |

---

## Tiếp Theo

### Để Chạy Trên Production:
```bash
npm run build
npm run start
```

### Để Kết Nối Backend Thực:
1. Tạo API routes trong `app/api/`
2. Cập nhật `hooks/useFactoryData.ts` để gọi API
3. Thay thế mock data bằng fetch/SWR

### Để Deploy:
- **Vercel** (Tự động): Kết nối GitHub, deploy tự động
- **Docker**: Build image và chạy container
- **VPS**: Upload code, cài Node.js, chạy `npm run build && npm run start`

---

## Tài Liệu Chi Tiết

- **README.md** - Tính năng & hướng dẫn đầy đủ
- **INSTALLATION.md** - Chi tiết từng bước cài đặt
- **QUICK_START.md** - Bắt đầu nhanh (3 bước)

---

## Hỗ Trợ

Nếu gặp vấn đề:
1. Xem phần **Xử Lý Sự Cố** ở trên
2. Đảm bảo Node.js 18+ đã cài
3. Thử xóa node_modules và cài lại
4. Kiểm tra tường lửa không chặn port 3000

---

## Phiên Bản & Thông Tin

- **Phiên bản ứng dụng**: 1.1
- **Ngôn ngữ**: 100% Tiếng Việt
- **Trạng thái**: Production-ready
- **Giấy phép**: MIT

---

**Chúc bạn sử dụng hệ thống thành công!** 🎉

Bắt đầu ngay với:
```bash
npm install && npm run dev
```

Sau đó truy cập: http://localhost:3000
