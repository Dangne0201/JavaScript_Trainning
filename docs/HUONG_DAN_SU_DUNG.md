# Hướng dẫn sử dụng Personal Task Manager

Tài liệu này áp dụng cho ứng dụng hiện tại trong repository. Đây là một ứng dụng
quản lý task tối giản, gồm giao diện HTML/CSS/JavaScript thuần và backend
Node.js/Express kết nối MongoDB.

## 1. Ứng dụng làm được gì?

- Xem danh sách task.
- Tạo task mới bằng tiêu đề.
- Đánh dấu task đã hoàn thành hoặc chưa hoàn thành.
- Xóa task.

Mỗi task có các trường:

```json
{
  "title": "Học JavaScript",
  "status": "todo"
}
```

`status` chỉ có thể là `todo` hoặc `done`. Khi tạo task, backend hiện chỉ nhận
`title` và đặt `status` mặc định là `todo`. MongoDB cũng tự tạo `_id`,
`createdAt` và `updatedAt`.

## 2. Công nghệ và cấu trúc chính

```text
frontend/                  Giao diện HTML, CSS và JavaScript
backend/src/app.js         Cấu hình Express và các route
backend/src/server.js      Kết nối database và khởi động server
backend/src/models/Task.js Schema Mongoose của task
docker-compose.yml         Chạy MongoDB bằng Docker
```

Database local sử dụng:

```text
MongoDB database: task_manager
Collection: tasks
```

## 3. Yêu cầu

- Git.
- Node.js `24.11.1` trở lên.
- npm (được cài cùng Node.js).
- Docker Desktop đang chạy.

## 4. Chạy project trên Windows

Mở PowerShell hoặc Command Prompt tại thư mục repository:

```powershell
cd F:\Javascript
docker compose up -d
cd backend
Copy-Item .env.example .env
npm install
npm start
```

Nếu đang dùng Command Prompt thay vì PowerShell, dùng lệnh tạo `.env` sau:

```cmd
copy .env.example .env
```

Nếu PowerShell chặn `npm.ps1` với lỗi `running scripts is disabled`, có thể
dùng trực tiếp file Windows của npm:

```powershell
npm.cmd install
npm.cmd start
```

Hoặc mở Command Prompt mới rồi chạy `npm install` và `npm start`.

Backend phục vụ giao diện tại:

```text
http://localhost:5000
```

Docker chỉ chạy MongoDB:

```text
MongoDB trong Docker  → localhost:27017
Node.js backend       → localhost:5000
```

File `backend/.env.example` đã có connection string local phù hợp:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task_manager
```

Không commit `backend/.env` vì đây là file cấu hình máy local.

## 5. Sử dụng giao diện

1. Mở `http://localhost:5000`.
2. Nhập tiêu đề vào ô `Task title`.
3. Bấm `Add task` để tạo task.
4. Bấm `Done` để đổi trạng thái sang `done`.
5. Bấm `Undo` để đổi lại `todo`.
6. Bấm `Delete` để xóa task.

Tiêu đề khi tạo task là bắt buộc và không được rỗng hoặc chỉ chứa khoảng trắng.

## 6. API

Base URL local là `http://localhost:5000/api`.

| Method | Endpoint | Chức năng |
| --- | --- | --- |
| GET | `/health` | Kiểm tra API |
| GET | `/tasks` | Lấy danh sách task |
| POST | `/tasks` | Tạo task |
| PUT | `/tasks/:id` | Cập nhật tiêu đề hoặc trạng thái |
| DELETE | `/tasks/:id` | Xóa task |

### Tạo task

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Học Express"
}
```

### Cập nhật task

```http
PUT /api/tasks/<mongo_object_id>
Content-Type: application/json
```

```json
{
  "title": "Học Express nâng cao",
  "status": "done"
}
```

ID trong URL phải là MongoDB ObjectId hợp lệ. `status` chỉ nhận `todo` hoặc
`done`.

## 7. Xem dữ liệu MongoDB

Docker Desktop chỉ quản lý container và volume; mục **Files** hiển thị các file
nội bộ của MongoDB, không hiển thị từng task thành file riêng.

Để xem document bằng giao diện, dùng MongoDB Compass và kết nối:

```text
mongodb://127.0.0.1:27017
```

Sau đó mở:

```text
task_manager → tasks → Documents
```

Hoặc mở tab **Exec** của container `personal-task-manager-mongodb`, chạy:

```bash
mongosh
```

Rồi nhập:

```javascript
use task_manager
db.tasks.find().pretty()
```

## 8. Dừng ứng dụng

Trong terminal backend, nhấn `Ctrl + C`. Dừng MongoDB nhưng giữ nguyên dữ liệu:

```powershell
docker compose down
```

Xóa cả volume và toàn bộ dữ liệu MongoDB:

```powershell
docker compose down -v
```

Chỉ dùng `-v` khi bạn thực sự muốn xóa dữ liệu.
