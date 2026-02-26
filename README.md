# Hệ Thống Quản Lý Nhà Máy Vải Sợi

Một nền tảng quản lý toàn diện cho các nhà máy sản xuất vải sợi, cung cấp giám sát thời gian thực, phân tích dữ liệu, quản lý nhân sự và tối ưu hóa sản xuất. **Tất cả hành động đều có backend simulation tương tác 100% tiếng Việt.**

## Tính Năng Chính

### 1. **Bảng Điều Khiển (Dashboard)** - Backend Tương Tác
- Giám sát KPI chính: Sản lượng, máy hoạt động, lỗi máy, tỉ lệ lỗi
- Theo dõi trạng thái từng máy xoắn (10 máy) với UI/UX chuẩn
- **🎯 Click vào máy để xem DIALOG chi tiết:**
  - Thông tin máy (ID, tên, trạng thái)
  - Chỉ số kỹ thuật: Nhiệt độ, RPM, Điện áp, Dòng điện, Công suất, Cảm biến rung
  - Lịch sử hoạt động 24h: Thời gian chạy, dừng, sản lượng, lỗi
  - **Hành động Backend**: Sửa Lỗi (nếu máy bị lỗi), Bảo Trì
- Hiển thị đơn hàng hiện tại với thanh tiến độ
- Cảnh báo gần đây (lỗi, bảo trì, quá nhiệt độ)

### 2. **Phân Tích (Analytics)** - Backend Chi Tiết Lỗi
- Biểu đồ xu hướng sản lượng 24 giờ
- Phân bố trạng thái máy (Pie Chart)
- Tỷ lệ lỗi theo máy
- **🎯 Top 10 máy lỗi - Click "Chi Tiết" để xem DIALOG:**
  - Thống kê lỗi: Tỉ lệ, Thời gian dừng, Lần sửa gần nhất
  - **Phân loại lỗi chi tiết**: Cơ Học (%), Điện (%), Phần Mềm (%), Khác (%) 
  - **Lịch sử lỗi 7 ngày**: Loại lỗi, Ngày/giờ, Mức độ nghiêm trọng
  - **Đề xuất khắc phục** từ hệ thống
  - **Hành động Backend**: Lên Lịch Bảo Trì, Phân Tích Chi Tiết
- Danh sách cảnh báo chi tiết

### 3. **Quản Lý Nhân Sự & KPI (HR-KPI)** - Lương Tự Động
- Top 5 nhân viên xuất sắc với KPI
- **🎯 Cấu hình giá công** → Tự động tính toán lại lương nhân viên
- Bảng lương chi tiết (10 nhân viên) với tính toán động
- Biểu đồ hiệu suất nhân viên
- **Hành động Backend**: Chỉnh sửa giá công, Quản lý shift

### 4. **Trộn Cotton (Cotton Mixing)** - AI Prediction
- AI tối ưu hóa trộn cotton với 3 yếu tố
- Tạo lô trộn mới: Loại Cotton, Tỉ Lệ (%), Nhiệt Độ (°C), Tốc Độ (RPM)
- **🎯 Click "Chi Tiết" để xem DIALOG dự đoán AI:**
  - Thông số lô trộn chi tiết
  - **Dự đoán chất lượng (AI)**: Điểm số với visual bar
  - **Phân tích từ AI**: Khuyến nghị tỉ lệ/nhiệt độ/tốc độ tối ưu
  - **Dự đoán chi tiết**: Độ mịn sợi (%), Cường độ (N/tex)
  - **Đánh giá rủi ro**: Quá tải nhiệt, Không đồng đều, Sợi đứt
  - **Hành động Backend**: Xuất Chi Tiết, Phê Duyệt
- Duyệt lô để bắt đầu xử lý
- Gợi ý tối ưu từ AI

### 5. **Quản Lý Năng Lượng (Energy Management)** - Date & Slider
- **🎯 Chọn Ngày/Tháng/Năm** để xem dữ liệu cụ thể
- **🎯 Thanh điều chỉnh giới hạn công suất** (300-800 kW)
- **🎯 Click "Xem Chi Tiết" để mở DIALOG:**
  - Thông tin ngày, giới hạn công suất đã chọn
  - **Tiêu thụ theo giờ (24 giờ)**: Biểu đồ động, RED-FLAG nếu vượt giới hạn
  - **Thống kê**: Tiêu thụ trung bình, cao nhất
- Theo dõi tiêu thụ năng lượng thời gian thực
- Biểu đồ xu hướng tiêu thụ
- Tiêu thụ năng lượng theo máy
- **Điều khiển HVAC**: Tùy chỉnh nhiệt độ (16-32°C), Chọn chế độ (Auto/Cooling/Heating/Eco)
- Mục tiêu hiệu quả năng lượng

### 6. **Bảo Trì (Maintenance)** - Backend Workflow
- Lịch bảo trì máy móc chi tiết
- **🎯 Click "Chi Tiết" để xem toàn bộ thông tin công việc**
- Theo dõi trạng thái: Chưa thực hiện → Đang thực hiện → Hoàn thành
- **Hành động Backend**:
  - Click "Bắt Đầu" → Chuyển sang "Đang thực hiện"
  - Click "Hoàn Thành" → Mở form báo cáo chi tiết
  - Điền ghi chú kỹ thuật, tham khảo danh sách kiểm tra
  - **Gửi Báo Cáo** → Backend cập nhật
- Ứng dụng di động mô phỏng (Báo cáo nhanh, Lịch sử)
- Danh sách kiểm tra bảo trì tiêu chuẩn

### 7. **Quản Lý Chất Lượng (Quality Management)** - Detail Modal
- Tiêu chuẩn chất lượng (Độ mịn, Cường độ, Tỷ lệ đứt, Độ đồng đều)
- Xu hướng chất lượng 7 ngày
- Phân tích lỗi sản phẩm
- **🎯 Đơn hàng - Click "Chi Tiết" để xem DIALOG:**
  - **Thông tin đơn hàng**: Mã, Sản phẩm, Tiến độ, Chất lượng
  - **Chỉ số chất lượng chi tiết** (4 metrics): Độ Mịn, Cường Độ, Độ Đồng Đều, Tỷ Lệ Lỗi
  - **Phân loại lỗi**: Sợi Mỏng, Nút Sợi, Sợi Đứt, Nhiễu Bụi (số lượng + mức độ)
  - **Hành động Backend**: Xuất Báo Cáo, Phê Duyệt
- Danh sách kiểm soát chất lượng hàng giờ/hàng ngày
- Gợi ý cải thiện chất lượng

## Dữ Liệu Mock

Hệ thống sử dụng 6 bộ dữ liệu mock:

1. **Machines (10)** - Máy xoắn với trạng thái thời gian thực
2. **Worst Machines (10)** - Top 10 máy có tỷ lệ lỗi cao
3. **HR Data (10)** - Thông tin nhân viên và lương
4. **AI Mixing Data (10)** - Lô trộn cotton
5. **Production Orders (10)** - Đơn hàng sản xuất
6. **Maintenance Data (10)** - Lịch bảo trì

## Công Nghệ

- **Frontend**: React 19, Next.js 16
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Ngôn Ngữ**: 100% Tiếng Việt

## Cập Nhật Thời Gian Thực

- Dữ liệu máy được cập nhật mỗi 3-5 giây
- Sản lượng, nhiệt độ, RPM thay đổi theo mô phỏng
- Tiến độ đơn hàng tự động tăng
- Lương nhân viên tự động tính dựa trên giá công

## Cách Sử Dụng - Hướng Dẫn Chi Tiết

### Bảng Điều Khiển (Dashboard)
1. **Click vào bất kỳ thẻ máy nào** → Mở DIALOG chi tiết máy
2. DIALOG hiển thị: Thông tin máy, Chỉ số kỹ thuật, Lịch sử hoạt động 24h
3. Hành động: Nhấn "Sửa Lỗi" (nếu máy lỗi) hoặc "Bảo Trì" để thực hiện
4. Theo dõi KPI thời gian thực ở đầu trang
5. Xem danh sách cảnh báo để phản ứng nhanh

### Phân Tích (Analytics)
1. **Nhấp vào "Chi Tiết"** trong bảng máy lỗi cao nhất → Mở DIALOG
2. DIALOG hiển thị: Thống kê lỗi, Phân loại lỗi chi tiết (%), Lịch sử lỗi 7 ngày
3. Xem đề xuất khắc phục từ hệ thống
4. **Hành động Backend**: "Lên Lịch Bảo Trì" hoặc "Phân Tích Chi Tiết"

### Quản Lý Nhân Sự (HR-KPI)
1. Xem Top 5 nhân viên xuất sắc
2. **Điều chỉnh giá công** → Lương tự động tính lại cho tất cả nhân viên
3. Xem bảng lương chi tiết với tính toán động
4. Biểu đồ hiệu suất nhân viên theo thời gian

### Trộn Cotton (Cotton Mixing)
1. Nhấp "**Tạo Lô Trộn Mới**" để tạo lô
2. Điều chỉnh: Loại Cotton, Tỉ Lệ (%), Nhiệt Độ (°C), Tốc Độ (RPM)
3. **Nhấp "Chi Tiết"** → Mở DIALOG dự đoán AI chi tiết
4. DIALOG hiển thị: Thông số lô, Dự đoán chất lượng, Phân tích AI, Rủi ro
5. **Hành động Backend**: "Xuất Chi Tiết" hoặc "Phê Duyệt"

### Quản Lý Năng Lượng (Energy Management)
1. **Chọn ngày/tháng/năm** để xem dữ liệu cụ thể
2. **Điều chỉnh giới hạn công suất** bằng slider (300-800 kW)
3. **Nhấp "Xem Chi Tiết"** → Mở DIALOG chi tiết tiêu thụ theo giờ
4. DIALOG hiển thị: Tiêu thụ 24 giờ, RED-FLAG nếu vượt giới hạn, Thống kê
5. **Điều khiển HVAC**: Tùy chỉnh nhiệt độ (16-32°C) và chế độ hoạt động

### Bảo Trì (Maintenance)
1. **Nhấp "Chi Tiết"** → Xem toàn bộ thông tin công việc
2. **Nhấp "Bắt Đầu"** → Chuyển sang "Đang thực hiện" (Backend cập nhật)
3. **Nhấp "Hoàn Thành"** → Mở form báo cáo chi tiết
4. Điền ghi chú kỹ thuật, tham khảo danh sách kiểm tra
5. **Gửi Báo Cáo** → Backend cập nhật trạng thái thành "Hoàn thành"
6. Ứng dụng di động mô phỏng cho báo cáo nhanh

### Chất Lượng (Quality Management)
1. **Nhấp "Chi Tiết"** trong bảng đơn hàng → Mở DIALOG
2. DIALOG hiển thị: Thông tin đơn hàng, Chỉ số chất lượng chi tiết
3. Xem phân loại lỗi (số lượng + mức độ nghiêm trọng)
4. **Hành động Backend**: "Xuất Báo Cáo" hoặc "Phê Duyệt"

## Cài Đặt và Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy server development
npm run dev

# Truy cập ở http://localhost:3000
```

## Cấu Trúc Thư Mục

```
├── app/
│   ├── layout.tsx          # Root layout với dark theme
│   ├── page.tsx            # Trang chính
│   └── globals.css         # Global styles
├── components/
│   ├── MainLayout.tsx      # Layout chính với sidebar
│   ├── MachineCard.tsx     # Card máy xoắn
│   ├── KPICard.tsx         # Card KPI
│   ├── StatusBadge.tsx     # Badge trạng thái
│   └── views/
│       ├── Dashboard.tsx           # Bảng điều khiển
│       ├── Analytics.tsx           # Phân tích
│       ├── HRKPIView.tsx           # Quản lý nhân sự
│       ├── CottonMixingView.tsx    # Trộn cotton
│       ├── EnergyManagementView.tsx# Năng lượng
│       ├── MaintenanceView.tsx     # Bảo trì
│       └── QualityManagementView.tsx# Chất lượng
└── hooks/
    └── useFactoryData.ts   # Hook dữ liệu mock
```

## Đặc Tính Backend Simulation

### Tương Tác Hoàn Toàn
✅ Dialog/Modal chi tiết cho tất cả hành động
✅ Form báo cáo tương tác (bảo trì, chất lượng)
✅ Slider điều chỉnh (giá công, nhiệt độ HVAC, công suất năng lượng)
✅ Date picker cho xem dữ liệu theo ngày/tháng/năm
✅ Hành động backend simulation (sửa lỗi, bảo trì, phê duyệt)
✅ Cập nhật thời gian thực mỗi 3-5 giây
✅ Tính toán tự động (lương, dự đoán chất lượng AI)

### 100% Tiếng Việt
- Giao diện toàn bộ tiếng Việt
- Dữ liệu mẫu tiếng Việt
- Thông báo và hành động tiếng Việt

## Ghi Chú

- Tất cả dữ liệu là mock và không được lưu trữ
- Dữ liệu sẽ reset khi tải lại trang
- Giao diện được tối ưu hóa cho desktop và mobile
- Thích hợp cho phát triển frontend trước khi kết nối backend thực

## Phiên Bản

v1.1 - Backend Simulation Interactive (2024-02-26)
- Thêm Dialog chi tiết máy, lỗi, lô trộn, chất lượng
- Thêm Date picker và slider điều chỉnh
- Thêm Modal báo cáo tương tác
- Backend simulation cho tất cả hành động

v1.0 - Initial Release (2024-02-26)
- 7 views chính
- 6 bộ dữ liệu mock
- Cập nhật thời gian thực

## Tác Giả

Tạo bởi v0 AI
