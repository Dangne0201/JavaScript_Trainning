# REST API reference

The API is served from `/api`. Authentication uses an HTTP-only cookie set by
registration or login. A browser sends it automatically for same-origin
requests; API clients should retain the cookie jar. All task routes require
authentication.

## Authentication

| Method | Endpoint             | Purpose                              |
| ------ | -------------------- | ------------------------------------ |
| POST   | `/api/auth/register` | Create account and sign in           |
| POST   | `/api/auth/login`    | Sign in                              |
| POST   | `/api/auth/logout`   | Sign out and invalidate all sessions |
| GET    | `/api/auth/me`       | Get the current user                 |

Registration and login accept:

```json
{
  "username": "sample-user",
  "password": "a-long-password-12"
}
```

Usernames are 3-30 letters, numbers, underscores, periods, or hyphens. Passwords
must be 12-128 characters. Registration responds with `201`; successful login
responds with `200`. Both return `{ "success": true, "data": { "id": "...",
"username": "..." } }` and set the authentication cookie. Password hashes and
tokens are not returned in JSON.

## Tasks

| Method | Endpoint         | Purpose                                     |
| ------ | ---------------- | ------------------------------------------- |
| GET    | `/api/tasks`     | Paginated list; supports search/filter/sort |
| POST   | `/api/tasks`     | Create task                                 |
| PATCH  | `/api/tasks/:id` | Update selected fields                      |
| PUT    | `/api/tasks/:id` | Backward-compatible partial update          |
| DELETE | `/api/tasks/:id` | Delete task                                 |

Task fields:

- `title`: required, 1-200 characters.
- `status`: `backlog`, `todo`, `in_progress`, or `done` (default `todo`).
- `priority`: `low`, `medium`, or `high` (default `medium`).
- `dueDate`: optional ISO 8601 date or `null`.
- `tags`: optional array of at most 10 strings, each 1-30 characters.

Create example:

```json
{
  "title": "Prepare project demo",
  "priority": "high",
  "dueDate": "2027-01-15",
  "tags": ["portfolio", "demo"]
}
```

List query parameters:

| Parameter  | Allowed values / default                            |
| ---------- | --------------------------------------------------- |
| `page`     | `1`-`10000` / `1`                                   |
| `limit`    | `1`-`100` / `10`                                    |
| `q`        | Case-insensitive title search, up to 100 characters |
| `status`   | A task status                                       |
| `priority` | `low`, `medium`, or `high`                          |
| `tag`      | Exact case-insensitive tag                          |
| `sortBy`   | `createdAt`, `dueDate`, `title`, or `priority`      |
| `order`    | `asc` or `desc` / `desc`                            |

Example response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

Invalid input returns `400`; unauthenticated requests return `401`; a missing or
non-owned task returns `404`; a duplicate username returns `409`; throttled
requests return `429`. Error responses have a `success: false` field and a
human-readable `message`.

Logout requires an active session, clears the browser cookie, and invalidates
all previously issued tokens for that account. The user can sign in again to
start a new session.
