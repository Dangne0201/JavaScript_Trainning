# Giải thích dự án Personal Task Manager

Tài liệu này ghi lại mục tiêu, các bước đã triển khai, kiến trúc và trách nhiệm
của từng nhóm file. Mục đích là để người mới có thể đọc từ đầu mà không bị
ngợp, đồng thời lập trình viên có thể nhanh chóng tìm đúng nơi cần sửa.

## 1. Bức tranh tổng thể

Project gồm hai ứng dụng độc lập:

```text
frontend/  React + Vite + Tailwind, giao diện người dùng
backend/   Express + MongoDB/Mongoose, REST API
```

Luồng chính:

```text
Browser
  -> React page
  -> Axios client
  -> Express route
  -> middleware (CORS, validation, JWT)
  -> controller
  -> Mongoose model
  -> MongoDB Atlas
```

Avatar đi theo luồng riêng:

```text
Browser -> Multer memory storage -> Cloudinary -> avatarUrl trong User
```

Email reminder đi theo luồng nền:

```text
node-cron mỗi ngày lúc 08:00
  -> tìm task chưa done sắp đến hạn
  -> Nodemailer gửi email cho owner
```

## 2. Các giai đoạn đã thực hiện

### Bước 1: Dựng backend CRUD

- Tạo Express server.
- Kết nối MongoDB bằng Mongoose.
- Tạo model `User` và `Task`.
- Tạo CRUD task.
- Thêm validation và centralized error handling.
- Thêm CORS và endpoint health check.

### Bước 2: Authentication và phân quyền

- Hash password bằng `bcryptjs`.
- Đăng ký và đăng nhập trả JWT.
- Middleware kiểm tra Bearer token.
- Gắn `owner` vào task.
- Mọi thao tác task chỉ chạy trên task của user hiện tại.

### Bước 3: Search, filter và pagination

- Tìm theo title.
- Lọc theo status, priority, tags.
- Phân trang với `page` và `limit`.
- Giới hạn `limit` tối đa 100 để tránh query quá lớn.

### Bước 4: Avatar Cloudinary

- Nhận multipart upload bằng Multer memory storage.
- Chỉ nhận JPG, PNG, WEBP.
- Giới hạn file 2 MB.
- Upload buffer lên Cloudinary.
- Lưu URL Cloudinary vào user.

### Bước 5: Email deadline reminder

- Cấu hình Nodemailer qua biến môi trường.
- Tạo cron job chạy mỗi ngày lúc 08:00.
- Tìm task chưa `done` có deadline trong 24 giờ.
- Gửi email đến email của owner.

### Bước 6: Frontend React

- Tạo giao diện login/register.
- Thêm protected routes.
- Xây layout có navigation và logout.
- Xây task list, form create/edit/delete, search và filter.
- Xây profile và avatar upload.
- Cấu hình Axios tự động gắn JWT.

### Bước 7: Deploy và kiểm tra production

- Backend deploy trên Render.
- Frontend deploy trên Vercel.
- MongoDB Atlas cho phép Render kết nối.
- Cấu hình `VITE_API_URL` trỏ đến Render API.
- Cấu hình CORS cho domain Vercel.
- Kiểm tra health, register, create task và delete task trên production.

## 3. Backend: cấu trúc và trách nhiệm file

### Entry point và cấu hình

| File | Trách nhiệm |
| --- | --- |
| `backend/src/server.js` | Load `.env`, kết nối MongoDB, khởi động cron và listen server |
| `backend/src/app.js` | Tạo Express app, JSON parser, CORS, route và error middleware |
| `backend/src/config/db.js` | Hàm kết nối Mongoose tới MongoDB |
| `backend/src/config/cloudinary.js` | Khởi tạo Cloudinary từ environment variables |

`app.js` chỉ tập trung lắp ráp HTTP application. `server.js` là nơi bắt đầu
process thật, nhờ vậy app dễ được import trong test hoặc tooling khác.

### Models

| File | Trách nhiệm |
| --- | --- |
| `backend/src/models/User.js` | Schema user, email unique, password không trả về mặc định, avatar URL |
| `backend/src/models/Task.js` | Schema task, deadline, priority, status, tags và owner |

Task luôn có `owner`. Controller lấy owner từ JWT, không nhận owner tùy ý từ
request body. Đây là điểm quan trọng để tránh user truy cập dữ liệu của nhau.

### Routes và controllers

| File | Trách nhiệm |
| --- | --- |
| `backend/src/routes/auth.routes.js` | Route register/login và validation credentials |
| `backend/src/routes/task.routes.js` | Route CRUD task, query validation và auth protection |
| `backend/src/routes/user.routes.js` | Route profile/avatar và auth protection |
| `backend/src/controllers/auth.controller.js` | Tạo user, hash password, kiểm tra login, ký JWT |
| `backend/src/controllers/task.controller.js` | Search/filter/pagination và CRUD theo owner |
| `backend/src/controllers/user.controller.js` | Trả profile và upload avatar Cloudinary |

Route chịu trách nhiệm nhận diện endpoint và validation cơ bản. Controller chịu
trách nhiệm xử lý nghiệp vụ và truy vấn database. Khi thêm tính năng API mới,
thông thường cần sửa route validation và controller tương ứng.

### Middlewares

| File | Trách nhiệm |
| --- | --- |
| `backend/src/middlewares/auth.middleware.js` | Đọc Bearer JWT, verify token và tìm current user |
| `backend/src/middlewares/validate.middleware.js` | Trả lỗi validation thống nhất |
| `backend/src/middlewares/upload.middleware.js` | Cấu hình Multer, MIME type và giới hạn 2 MB |
| `backend/src/middlewares/error.middleware.js` | Chuyển lỗi Mongoose, Multer và lỗi server thành JSON response |

Thứ tự middleware quan trọng: request đi qua auth/validation trước khi controller
được chạy; error middleware được gắn cuối app để bắt lỗi từ các route.

### Utilities

| File | Trách nhiệm |
| --- | --- |
| `backend/src/utils/sendEmail.js` | Tạo Nodemailer transporter và gửi email reminder |
| `backend/src/utils/cronJobs.js` | Khai báo lịch cron và hàm quét task sắp hết hạn |

Các secret SMTP, JWT, MongoDB và Cloudinary chỉ đi qua environment variables,
không hard-code trong source code.

## 4. Frontend: cấu trúc và trách nhiệm file

| File | Trách nhiệm |
| --- | --- |
| `frontend/src/main.jsx` | React entry point và BrowserRouter |
| `frontend/src/App.jsx` | Khai báo route login, register, tasks và profile |
| `frontend/src/api/client.js` | Axios instance, API base URL và tự gắn JWT |
| `frontend/src/components/ProtectedRoute.jsx` | Chặn route protected khi chưa có token |
| `frontend/src/components/Layout.jsx` | Navigation, outlet và logout |
| `frontend/src/pages/Login.jsx` | Form đăng nhập |
| `frontend/src/pages/Register.jsx` | Form đăng ký |
| `frontend/src/pages/Tasks.jsx` | Form task, danh sách, search, filter, edit, delete |
| `frontend/src/pages/Profile.jsx` | Hiển thị user và upload avatar |
| `frontend/src/index.css` | Tailwind directives và style nền |

Token được lưu trong `localStorage` với key `token`. Axios interceptor đọc token
này rồi thêm `Authorization: Bearer ...` vào request. Khi logout, token bị xóa
và user không còn đi qua `ProtectedRoute`.

## 5. Các file cấu hình và deploy

| File | Trách nhiệm |
| --- | --- |
| `backend/.env.example` | Danh sách biến môi trường backend cần có |
| `frontend/.env.example` | Biến `VITE_API_URL` cho frontend |
| `backend/package.json` | Dependencies và scripts backend |
| `frontend/package.json` | Dependencies và scripts frontend |
| `render.yaml` | Khai báo Render service, build/start command và env vars |
| `frontend/vercel.json` | Rewrite để React Router hoạt động khi refresh URL |
| `backend/.gitignore` | Không commit `.env` và `node_modules` |
| `frontend/.gitignore` | Không commit `.env`, `node_modules` và build output |

Render dùng:

```text
rootDir: backend
buildCommand: npm install
startCommand: npm start
```

Vercel dùng thư mục `frontend` làm root directory và lấy API URL từ
`VITE_API_URL`.

## 6. Quy tắc mở rộng project

Khi thêm một field task:

1. Cập nhật `backend/src/models/Task.js`.
2. Cập nhật validation trong `backend/src/routes/task.routes.js`.
3. Cập nhật controller nếu cần logic riêng.
4. Cập nhật form và hiển thị trong `frontend/src/pages/Tasks.jsx`.
5. Cập nhật tài liệu API và hướng dẫn sử dụng.

Khi thêm endpoint protected:

1. Đặt route dưới `router.use(protect)` hoặc thêm `protect` cho route đó.
2. Không lấy user id từ body; dùng user đã được middleware xác thực.
3. Thêm validation bằng `express-validator`.
4. Kiểm tra quyền sở hữu trong query database.

Khi thêm environment variable:

1. Thêm tên biến vào `.env.example`.
2. Thêm biến vào `render.yaml` nếu backend production cần dùng.
3. Cập nhật tài liệu, nhưng không ghi giá trị secret thật vào repository.

## 7. Các điểm cần nhớ khi bảo trì

- Không commit `backend/.env` hoặc `frontend/.env`.
- Không log JWT, password, MongoDB URI, Cloudinary secret hoặc SMTP password.
- Sau khi đổi environment variable trên Render/Vercel, phải redeploy hoặc restart
  service phù hợp.
- Nếu CORS lỗi, kiểm tra chính xác origin frontend, bao gồm `https://`, hostname
  và port.
- Render Free có thể spin down khi không hoạt động; request đầu tiên có thể chậm.
- Chạy `npm run build` trong `frontend` trước khi push các thay đổi frontend.

## 8. URL production hiện tại

- Frontend: https://java-script-trainning-b49zzt1fc-dang-b4a4.vercel.app
- Backend: https://personal-task-manager-api-h8wl.onrender.com
- Health check: https://personal-task-manager-api-h8wl.onrender.com/api/health
