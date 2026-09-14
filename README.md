# Personal Task Manager

Backend for the Personal Task Manager project. The application is being built in stages from the supplied project prompt.

## Current stage: Step 7

The `backend/` directory currently includes:

- Express API on port `5000`
- MongoDB connection through Mongoose
- `User` and `Task` models
- JWT authentication with bcrypt password hashing
- User-owned task CRUD endpoints
- Request validation and centralized JSON error handling
- CORS configuration for the Vite frontend

File upload, email reminders, and the React frontend will be added in later stages.

## User endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/users/me` | Get the authenticated user |
| PUT | `/api/users/avatar` | Upload a JPG, PNG, or WEBP avatar (maximum 2MB) |

The avatar endpoint expects a multipart/form-data field named `avatar`.

## Deadline reminders

The backend schedules a daily job at 08:00 server time. It finds non-completed
tasks due in the next 24 hours and sends a reminder through Nodemailer.
Configure `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, and optionally
`EMAIL_SECURE` and `EMAIL_FROM` in `.env`.

## Deployment

Deployment configuration is included in [render.yaml](./render.yaml) for Render
and [frontend/vercel.json](./frontend/vercel.json) for Vercel SPA routing.
Create the Render environment variables from `backend/.env.example`, then set
the deployed API URL as `VITE_API_URL` in the Vercel project.

## Run the backend

Requirements:

- Node.js `v24.11.1` (the version used during this setup)
- npm
- A MongoDB Atlas connection string

```powershell
cd backend
Copy-Item .env.example .env
# Fill MONGODB_URI in backend/.env
npm install
npm run dev
```

The API health check is available at `http://localhost:5000/api/health`.

## Authentication endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register and receive a JWT |
| POST | `/api/auth/login` | Login and receive a JWT |

Use the returned token on task requests:

```text
Authorization: Bearer YOUR_TOKEN
```

## Task endpoints

All task endpoints now require a valid JWT. Each user can only see and modify their own tasks. The list endpoint supports:

```text
GET /api/tasks?search=express&status=todo&priority=high&tags=Backend,Học tập&page=1&limit=10
```

- `search`: case-insensitive search in the title
- `status`: `todo`, `in-progress`, or `done`
- `priority`: `low`, `medium`, or `high`
- `tags`: comma-separated tags; a task matching any supplied tag is returned
- `page` and `limit`: pagination, with a maximum limit of 100

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Example request body:

```json
{
  "title": "Learn Express",
  "description": "Build the first API",
  "deadline": "2026-09-20T10:00:00.000Z",
  "priority": "high",
  "status": "todo",
  "tags": ["Học tập"]
}
```
