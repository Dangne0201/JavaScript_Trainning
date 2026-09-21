# Personal Task Manager

Một project nhỏ để học JavaScript qua ứng dụng quản lý công việc. Hướng dẫn
chi tiết nằm trong [docs/HUONG_DAN_SU_DUNG.md](docs/HUONG_DAN_SU_DUNG.md), còn
kiến trúc được giải thích trong [docs/GIAI_THICH_DU_AN.md](docs/GIAI_THICH_DU_AN.md).

## Công nghệ

- JavaScript thuần cho giao diện và logic
- Node.js để chạy backend
- Express.js để tạo API
- MongoDB và Mongoose để lưu task
- HTML và CSS tối giản, không dùng React hoặc Tailwind

## Chức năng

- Xem danh sách task
- Thêm task
- Đánh dấu task đã hoàn thành hoặc chưa hoàn thành
- Xóa task

## Chạy project chính

Yêu cầu Git, Node.js, npm và Docker Desktop.

```powershell
git clone https://github.com/Dangne0201/JavaScript_Trainning.git
cd JavaScript_Trainning
docker compose up -d

cd backend
Copy-Item .env.example .env
npm install
npm start
```

Nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd install` và `npm.cmd start`, hoặc
chạy các lệnh npm trong Command Prompt. Trong Command Prompt, lệnh copy file là
`copy .env.example .env`.

Docker chạy MongoDB local ở `localhost:27017`. File `.env.example` đã có sẵn
connection string phù hợp, nên chỉ cần copy thành `.env` rồi lưu lại. Không đổi
tên thành `.env.txt`; file phải có đúng tên `.env`.

Nếu port `5000` đã được dùng, hãy dừng backend cũ bằng `Ctrl + C` rồi chạy lại
`npm start`.

Mở giao diện tại:

```text
http://localhost:5000
```

Backend vẫn chạy trực tiếp bằng Node.js; Docker chỉ chạy MongoDB:

```text
Docker MongoDB → localhost:27017
Node.js backend → localhost:5000
```

Khi muốn dừng MongoDB:

```powershell
docker compose down
```

Muốn dừng và xóa luôn dữ liệu MongoDB:

```powershell
docker compose down -v
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

## Các thư mục bài học khác

`backend_project/` là một project `json-server` độc lập. Thư mục `learning/`
chứa các bài tập JavaScript riêng, không thuộc luồng chạy của Personal Task
Manager.
