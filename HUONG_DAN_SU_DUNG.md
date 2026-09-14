# Hướng dẫn sử dụng Personal Task Manager

Tài liệu này dành cho người mới muốn chạy và sử dụng ứng dụng quản lý công việc cá nhân.

## 1. Ứng dụng làm được gì?

Personal Task Manager cho phép bạn:

- Đăng ký tài khoản và đăng nhập.
- Tạo, xem, tìm kiếm, lọc, sửa và xóa công việc.
- Đặt hạn hoàn thành, mức ưu tiên, trạng thái và tags cho từng công việc.
- Chỉ xem và thao tác trên những công việc thuộc tài khoản của mình.
- Cập nhật ảnh đại diện.
- Nhận email nhắc các công việc chưa hoàn thành sắp đến hạn.

## 2. Dùng bản production

Frontend đã được deploy tại:

**https://java-script-trainning-b49zzt1fc-dang-b4a4.vercel.app**

Mở đường dẫn trên trình duyệt, chọn **Register** để tạo tài khoản hoặc **Login**
để đăng nhập.

API production:

**https://personal-task-manager-api-h8wl.onrender.com**

Kiểm tra API đang hoạt động bằng cách mở:

**https://personal-task-manager-api-h8wl.onrender.com/api/health**

Nếu lần truy cập đầu tiên phản hồi chậm, có thể Render Free đang khởi động lại
service sau thời gian không hoạt động. Chờ khoảng một phút rồi thử lại.

## 3. Chạy project trên máy Windows

### Yêu cầu

- Node.js phiên bản `24.11.1` trở lên.
- npm.
- Tài khoản MongoDB Atlas và connection string.
- Tài khoản Cloudinary nếu muốn dùng upload avatar.
- Gmail App Password hoặc SMTP credentials nếu muốn dùng email reminder.

### Bước 1: Cài backend

Mở PowerShell tại thư mục project:

```powershell
cd D:\NTGiang\JavaScript_Trainning\backend
npm install
Copy-Item .env.example .env
```

Mở file `backend/.env` và điền các giá trị cần thiết. Không commit file này
vì nó chứa secret:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=tao-mot-chuoi-bi-mat-dai
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Nếu password MongoDB có ký tự đặc biệt như `@`, `#`, `%` hoặc `&`, hãy URL-encode
password trước khi đưa vào URI. Ví dụ, `@` trở thành `%40`.

Chạy backend:

```powershell
npm run dev
```

Backend chạy tại `http://localhost:5000`.

> Trong PowerShell không gõ `PORT=5000` như trên Linux/macOS. Project đọc biến
> môi trường từ file `.env`, nên chỉ cần điền file rồi chạy `npm run dev`.

### Bước 2: Cài frontend

Mở một cửa sổ PowerShell khác:

```powershell
cd D:\NTGiang\JavaScript_Trainning\frontend
npm install
Copy-Item .env.example .env
```

Nội dung `frontend/.env` khi chạy local:

```env
VITE_API_URL=http://localhost:5000/api
```

Chạy frontend:

```powershell
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, thường là:

**http://localhost:5173**

## 4. Cách sử dụng giao diện

### Đăng ký và đăng nhập

1. Mở trang `/register`.
2. Nhập tên, email và password tối thiểu 6 ký tự.
3. Bấm **Register**.
4. Sau khi đăng ký thành công, ứng dụng đưa bạn đến trang quản lý task.

Lần đăng nhập sau, mở `/login`, nhập email/password rồi bấm **Login**.

### Tạo task

Tại trang **Task Manager**:

1. Nhập tiêu đề.
2. Chọn deadline.
3. Có thể nhập mô tả và tags, cách nhau bằng dấu phẩy.
4. Chọn status: Todo, In progress hoặc Done.
5. Chọn priority: Low, Medium hoặc High.
6. Bấm **Create**.

### Tìm kiếm và lọc

- Ô **Search title** tìm theo title, không phân biệt chữ hoa/chữ thường.
- Có thể lọc theo status.
- Có thể lọc theo priority.
- Backend hỗ trợ thêm lọc theo tags và phân trang qua API.

### Sửa hoặc xóa task

- Bấm **Edit**, thay đổi thông tin rồi lưu.
- Bấm **Delete** để xóa task.
- Task của tài khoản khác không thể bị xem, sửa hoặc xóa.

### Cập nhật profile và avatar

1. Mở trang **Profile**.
2. Chọn file JPG, PNG hoặc WEBP.
3. File tối đa 2 MB.
4. Bấm nút upload.

Ảnh được lưu trên Cloudinary, còn database chỉ lưu URL ảnh.

## 5. API nhanh

Base URL local là `http://localhost:5000/api`.

| Method | Endpoint | Cần đăng nhập | Chức năng |
| --- | --- | --- | --- |
| GET | `/health` | Không | Kiểm tra API |
| POST | `/auth/register` | Không | Tạo tài khoản |
| POST | `/auth/login` | Không | Đăng nhập |
| GET | `/users/me` | Có | Lấy profile hiện tại |
| PUT | `/users/avatar` | Có | Upload avatar, field `avatar` |
| GET | `/tasks` | Có | Danh sách task |
| POST | `/tasks` | Có | Tạo task |
| GET | `/tasks/:id` | Có | Lấy một task |
| PUT | `/tasks/:id` | Có | Cập nhật task |
| DELETE | `/tasks/:id` | Có | Xóa task |

Các request protected cần header:

```text
Authorization: Bearer <JWT_TOKEN>
```

Body tạo task tối thiểu:

```json
{
  "title": "Học Express",
  "deadline": "2026-12-01T10:00:00.000Z"
}
```

Các field tùy chọn:

```json
{
  "description": "Xây dựng API đầu tiên",
  "priority": "high",
  "status": "todo",
  "tags": ["backend", "learning"]
}
```

Query của `GET /tasks`:

```text
/tasks?search=express&status=todo&priority=high&tags=backend,learning&page=1&limit=10
```

`limit` tối đa là 100.

## 6. Một số lỗi thường gặp

### `PORT=5000 is not recognized`

Bạn đang dùng cú pháp Linux/macOS trong PowerShell. Không chạy dòng đó như một
lệnh. Hãy đặt `PORT=5000` trong `backend/.env`.

### `authentication failed` từ MongoDB

Kiểm tra username/password database MongoDB, tên cluster và việc URL-encode ký tự
đặc biệt trong password. Không dùng nguyên văn placeholder `<password>`.

### CORS error

Kiểm tra:

- Backend đang chạy đúng port.
- `frontend/.env` có `VITE_API_URL=http://localhost:5000/api`.
- `backend/.env` có `CLIENT_URL=http://localhost:5173`.
- Nếu dùng `127.0.0.1`, hãy mở frontend bằng đúng origin đã cấu hình hoặc cập nhật
  `CLIENT_URL`.

Sau khi đổi file `.env`, hãy restart cả backend và frontend.

### Không gửi được email

Kiểm tra `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_SECURE`.
Với Gmail nên dùng App Password, không dùng password đăng nhập Gmail thông thường.

## 7. Dừng ứng dụng

Trong mỗi terminal đang chạy service, nhấn:

```text
Ctrl + C
```

