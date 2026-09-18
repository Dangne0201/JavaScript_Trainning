# Personal Task Manager

Một project nhỏ để học JavaScript qua ứng dụng quản lý công việc.

## Công nghệ

- JavaScript thuần cho giao diện và logic
- Node.js để chạy backend
- Express.js để tạo API
- MongoDB và Mongoose để lưu task
- HTML tối giản, không dùng CSS, React hoặc Tailwind

## Chức năng

- Xem danh sách task
- Thêm task
- Đánh dấu task đã hoàn thành hoặc chưa hoàn thành
- Xóa task

## Chạy project

Yêu cầu Node.js, npm và MongoDB connection string.

```powershell
cd backend
Copy-Item .env.example .env
# Điền MONGODB_URI trong backend/.env
npm install
npm start
```

Mở giao diện tại:

```text
http://localhost:5000
```

Backend phục vụ giao diện HTML trong thư mục `frontend` và cung cấp các API:

| Method | Endpoint | Chức năng |
| --- | --- | --- |
| GET | `/api/tasks` | Lấy danh sách task |
| POST | `/api/tasks` | Thêm task |
| PUT | `/api/tasks/:id` | Đổi tên hoặc trạng thái task |
| DELETE | `/api/tasks/:id` | Xóa task |

Ví dụ dữ liệu task:

```json
{
  "title": "Học JavaScript",
  "status": "todo"
}
```
