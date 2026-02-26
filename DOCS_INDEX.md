# Danh Sách Tài Liệu - Hệ Thống Quản Lý Nhà Máy Vải Sợi

## 📖 Hướng Dẫn Nhanh (5 phút)

**Dành cho:** Những người muốn bắt đầu ngay lập tức

**Tệp tin:** `QUICK_START.md`

Nội dung:
- 3 bước cài đặt
- Các lệnh cơ bản
- Troubleshooting nhanh

**Bắt đầu:** Mở file và làm theo 3 bước

---

## 🚀 Bắt Đầu Đầy Đủ (15 phút)

**Dành cho:** Những người muốn hiểu chi tiết

**Tệp tin:** `GET_STARTED.md` (VỊ TRÍ KHUYÊN CẢI)

Nội dung:
- Tóm tắt dự án
- Yêu cầu hệ thống
- 4 bước cài đặt chi tiết
- Cấu trúc thư mục
- 7 views chức năng
- Dữ liệu mock
- Hành động tương tác
- Công nghệ sử dụng
- Xử lý sự cố
- Tiếp theo

**Bắt đầu:** Đọc từ trên xuống và làm theo hướng dẫn

---

## 🔧 Cài Đặt Chi Tiết (20 phút)

**Dành cho:** Những người cần hỗ trợ cài đặt chi tiết

**Tệp tin:** `INSTALLATION.md`

Nội dung:
- Cách tải xuống code (2 cách)
- Cài Node.js
- Cài dependencies
- Chạy dev server
- Truy cập ứng dụng
- Các lệnh hữu ích
- Xử lý sự cố chi tiết
- Cấu hình tùy chỉnh
- Kết nối backend

**Bắt đầu:** Đọc bước theo bước

---

## 📚 Tài Liệu Đầy Đủ

**Dành cho:** Những người muốn biết tất cả tính năng

**Tệp tin:** `README.md`

Nội dung:
- Tính năng chính (7 views)
- Công nghệ
- Cập nhật thời gian thực
- Hướng dẫn sử dụng chi tiết
- Cấu trúc dự án
- Đặc tính backend simulation
- Phiên bản & lịch sử

**Bắt đầu:** Đọc từ trên xuống

---

## 🎯 Lộ Trình Đề Nghị

### Lần Đầu Tiên?
1. **Đọc:** `QUICK_START.md` (5 phút)
2. **Thực hành:** Cài đặt theo 3 bước
3. **Khám phá:** Mở `http://localhost:3000`

### Gặp Vấn Đề?
1. **Xem:** Phần **Troubleshooting** trong `QUICK_START.md`
2. **Chi tiết hơn:** `INSTALLATION.md`
3. **Vẫn có vấn đề:** Kiểm tra `GET_STARTED.md` - Phần **Xử Lý Sự Cố**

### Muốn Biết Thêm Về Tính Năng?
1. **Tóm tắt:** `GET_STARTED.md` - Phần **7 Views Chức Năng**
2. **Chi tiết:** `README.md` - Phần **Tính Năng Chính**
3. **Hướng dẫn sử dụng:** `README.md` - Phần **Cách Sử Dụng**

### Muốn Deploy?
1. **Đọc:** `GET_STARTED.md` - Phần **Tiếp Theo**
2. **Chi tiết:** `INSTALLATION.md` - Phần **Xây Dựng Cho Production**
3. **Kết nối backend:** `INSTALLATION.md` - Phần **Kết Nối Backend**

---

## 📋 Danh Sách Kiểm Tra Cài Đặt

- ✅ Node.js 18+ đã cài (kiểm tra: `node --version`)
- ✅ NPM hoặc pnpm đã cài (kiểm tra: `npm --version`)
- ✅ Code đã giải nén
- ✅ Mở Terminal/PowerShell tại thư mục dự án
- ✅ Chạy `npm install`
- ✅ Chạy `npm run dev`
- ✅ Truy cập `http://localhost:3000`

---

## 🎓 Cấu Trúc Hệ Thống

```
Documentation
├── QUICK_START.md          ← Bắt đầu nhanh (5 phút)
├── GET_STARTED.md          ← Đầy đủ & chi tiết (15 phút) ⭐ CHÍNH
├── INSTALLATION.md         ← Chi tiết từng bước (20 phút)
├── README.md               ← Tài liệu dầy đủ & tính năng
└── DOCS_INDEX.md           ← File này
```

---

## 💡 Mẹo Hữu Ích

### Để Bắt Đầu Nhanh Nhất
```bash
cd v0-project
npm install
npm run dev
# Truy cập: http://localhost:3000
```

### Để Hiểu Dữ Liệu
Xem: `hooks/useFactoryData.ts`
- 10 máy xoắn
- 10 nhân viên
- 10 lô trộn
- 10 đơn hàng
- Tất cả cập nhật mỗi 3-5 giây

### Để Sửa Đổi Giao Diện
- Colors: `app/globals.css`
- Layouts: `components/views/*.tsx`
- Styling: `tailwind.config.ts`

### Để Kết Nối API
1. Tạo file: `app/api/machines/route.ts`
2. Cập nhật: `hooks/useFactoryData.ts`
3. Thay `useState` bằng `fetch` hoặc `SWR`

---

## 🔗 Liên Kết Nhanh

| Liên Kết | Nội Dung |
|---------|---------|
| [QUICK_START.md](./QUICK_START.md) | Bắt đầu nhanh - 3 bước |
| [GET_STARTED.md](./GET_STARTED.md) | Hướng dẫn đầy đủ ⭐ |
| [INSTALLATION.md](./INSTALLATION.md) | Chi tiết cài đặt |
| [README.md](./README.md) | Tất cả tính năng |
| [hooks/useFactoryData.ts](./hooks/useFactoryData.ts) | Mock data |
| [components/MainLayout.tsx](./components/MainLayout.tsx) | Layout chính |

---

## 📞 Hỗ Trợ

### Lỗi Cài Đặt
→ Xem: `INSTALLATION.md` - **Xử Lý Sự Cố**

### Lỗi Port/Networking
→ Xem: `GET_STARTED.md` - **Xử Lý Sự Cố**

### Tính năng không hiểu
→ Xem: `README.md` - **Cách Sử Dụng**

### Muốn tùy chỉnh/phát triển
→ Xem: `GET_STARTED.md` - **Tiếp Theo**

---

## ✅ Kiểm Tra Kết Thúc Cài Đặt

Sau khi cài xong, bạn sẽ thấy:
```
✔ Ready in 2.1s
  ▲ Next.js 16.1.6
  - Local: http://localhost:3000
```

Và truy cập `http://localhost:3000` sẽ thấy:
- Sidebar trái với 7 menu
- Dashboard ở giữa
- Giao diện dark theme toàn tiếng Việt

🎉 **Cài đặt thành công!**

---

**Tài liệu cập nhật lần cuối:** 26/02/2025
**Phiên bản ứng dụng:** 1.1
**Trạng thái:** Production-ready
