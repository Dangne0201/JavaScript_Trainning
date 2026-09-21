# Giải thích dự án Personal Task Manager

Đây là ứng dụng CRUD task tối giản dùng JavaScript thuần ở frontend,
Node.js/Express ở backend và MongoDB chạy trong Docker.

## 1. Cấu trúc repository

```text
frontend/       Giao diện chính của Personal Task Manager
backend/        REST API Express và kết nối MongoDB
docker-compose.yml
                Khởi động MongoDB local
learning/       Các file luyện tập JavaScript độc lập
```

Thư mục `learning/` không thuộc luồng chạy của Personal Task Manager. Khi chạy
ứng dụng chính, chỉ cần dùng `frontend`, `backend` và `docker-compose.yml`
trong thư mục `project/`.

## 2. Luồng tổng thể

```text
Người dùng
  -> frontend/index.html
  -> frontend/app.js
  -> HTTP API /api/tasks
  -> backend/src/app.js
  -> backend/src/routes/task.routes.js
  -> backend/src/middlewares/validate.middleware.js
  -> backend/src/controllers/task.controller.js
  -> backend/src/models/Task.js
  -> MongoDB database task_manager, collection tasks
```

Khi backend khởi động, `server.js` kết nối MongoDB trước rồi mới mở port HTTP.

## 3. Frontend

| File | Trách nhiệm |
| --- | --- |
| `frontend/index.html` | Form nhập task và danh sách task |
| `frontend/style.css` | Giao diện và bố cục |
| `frontend/app.js` | Gọi API, hiển thị task, đổi trạng thái và xóa task |

Frontend dùng `fetch()` với các API:

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

Backend phục vụ trực tiếp các file frontend bằng `express.static`, nên project
hiện tại không dùng React, Vite, Axios hoặc Tailwind.

## 4. Backend

### `backend/src/server.js`

- Đọc biến môi trường bằng `dotenv`.
- Gọi hàm kết nối MongoDB.
- Khởi động Express tại `PORT`, mặc định là `5000`.
- Báo lỗi nếu port đang được sử dụng.

### `backend/src/app.js`

- Tạo Express application.
- Bật đọc JSON request bằng `express.json()`.
- Phục vụ thư mục `frontend`.
- Khai báo endpoint `/api/health`.
- Gắn task routes tại `/api/tasks`.
- Gắn middleware 404 và error handler ở cuối.

### `backend/src/config/db.js`

Đọc `MONGODB_URI` và kết nối Mongoose tới MongoDB. Nếu biến này không tồn tại,
backend sẽ dừng với lỗi cấu hình.

### `backend/src/routes/task.routes.js`

Định nghĩa route và validation:

| Route | Controller | Chức năng |
| --- | --- | --- |
| `GET /` | `getTasks` | Lấy danh sách task |
| `POST /` | `createTask` | Tạo task |
| `PUT /:id` | `updateTask` | Cập nhật task |
| `DELETE /:id` | `deleteTask` | Xóa task |

Vì route được gắn dưới `/api/tasks`, các endpoint thực tế là
`/api/tasks`, `/api/tasks/:id`.

### `backend/src/controllers/task.controller.js`

| Hàm | Trách nhiệm |
| --- | --- |
| `getTasks` | Lấy task và sắp xếp mới nhất trước |
| `createTask` | Tạo task từ `title` |
| `updateTask` | Cập nhật `title` và `status` |
| `deleteTask` | Xóa task theo `_id` |

### `backend/src/models/Task.js`

Schema hiện tại chỉ có:

```text
title   String, bắt buộc, không được rỗng
status  String, chỉ nhận todo hoặc done, mặc định todo
```

`timestamps: true` khiến Mongoose tự thêm `createdAt` và `updatedAt`.

### Middleware

`validate.middleware.js` trả lỗi `400` khi validation trong route thất bại.
`error.middleware.js` xử lý route không tồn tại, lỗi Mongoose và lỗi server rồi
trả JSON response thống nhất.

## 5. MongoDB và Docker

`docker-compose.yml` tạo container:

```text
personal-task-manager-mongodb
```

MongoDB lắng nghe ở `localhost:27017`. Dữ liệu được lưu trong Docker volume:

```text
personal-task-manager-data
```

MongoDB lưu document trong các file nội bộ ở `/data/db`; không có file riêng
cho từng task. Muốn xem dữ liệu, dùng MongoDB Compass hoặc `mongosh`:

```javascript
use task_manager
db.tasks.find().pretty()
```

## 6. Dữ liệu hợp lệ

Tạo task cần body:

```json
{
  "title": "Học MongoDB"
}
```

Khi cập nhật, `title` nếu được gửi phải không rỗng và `status` phải là `todo`
hoặc `done`. Với cập nhật và xóa, `:id` phải là MongoDB ObjectId hợp lệ.

## 7. Những phần không thuộc ứng dụng chính

- `learning/backend_project/` là project `json-server` riêng, dùng `db.json` và
  chạy bằng `npm run dev` trong thư mục đó.
- `learning/` chứa các bài tập JavaScript/DOM độc lập.
- Các file này không được backend chính sử dụng và không cần chạy khi sử dụng
  Personal Task Manager.
