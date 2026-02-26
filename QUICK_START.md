# Bắt Đầu Nhanh (Quick Start)

## Chỉ 3 Bước để Chạy Ứng Dụng

### 1. Tải Xuống & Giải Nén
- Nhấn **"Download ZIP"** từ v0.app
- Giải nén file vào thư mục bất kỳ

### 2. Cài Đặt & Chạy (Chọn 1)

#### Option A: Windows (PowerShell)
```powershell
cd path\to\v0-project
npm install
npm run dev
```

#### Option B: Mac/Linux (Terminal)
```bash
cd path/to/v0-project
npm install
npm run dev
```

### 3. Mở Trình Duyệt
```
http://localhost:3000
```

**Xong!** Ứng dụng sẽ chạy ngay lập tức.

---

## Troubleshooting Nhanh

| Lỗi | Giải Pháp |
|-----|----------|
| `npm: command not found` | Cài Node.js từ https://nodejs.org |
| `Port 3000 already in use` | Chạy `npm run dev -- -p 3001` |
| `Cannot find module` | Chạy `npm install` lại |
| Styling không đúng | Nhấn `Ctrl + Shift + Delete` để clear cache |

---

## Điều Hướng Ứng Dụng

Sau khi mở `http://localhost:3000`:

1. **Sidebar trái** - Chuyển đổi giữa 7 views
2. **Click máy/hàng** - Mở chi tiết (Dialog/Modal)
3. **Điều chỉnh slider** - Thay đổi giá công, nhiệt độ, công suất
4. **Bảng lương** - Tự động cập nhật theo giá công

---

## Tài Liệu Đầy Đủ

Xem chi tiết tại: [INSTALLATION.md](./INSTALLATION.md) hoặc [README.md](./README.md)

---

Vui lòng enjoy! 🎉
