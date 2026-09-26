# User and developer guide

## Run the complete app with Docker

Requirements: Git and Docker Desktop installed and running. Clone the repository
and run these commands from PowerShell:

```powershell
git clone https://github.com/Dangne0201/JavaScript_Trainning.git
cd JavaScript_Trainning\project
docker compose -f docker-compose.yml -f docker-compose.demo.yml up --build
```

Visit <http://localhost:5000>, choose **Create an account**, and register with a
username and password of at least 12 characters. The database data is stored in
a named Docker volume.

For this explicitly selected local demo, Compose supplies a demo-only signing
key and binds both services to localhost. No `.env` file, Node.js installation,
or separate MongoDB installation is needed. Never expose this demo
configuration to the public internet; use a private `JWT_SECRET` for a
shared/production deployment. The base Compose configuration has no default
secret and the server refuses to start without a 32-character secret.

Stop containers with `Ctrl+C` or
`docker compose -f docker-compose.yml -f docker-compose.demo.yml down`. To
delete the local database too, add `-v` to that command.

## Run backend locally

For development with MongoDB in Docker and Node.js on the host:

```powershell
cd project
docker compose up -d mongodb
Copy-Item backend\.env.example backend\.env
```

Set a random 32-character-or-longer `JWT_SECRET` in `backend\.env`. Then:

```powershell
cd backend
npm ci
npm run dev
```

The backend serves the UI at <http://localhost:5000>. If PowerShell blocks
`npm.ps1`, use `npm.cmd` instead. Use Node.js 24.11.1 or newer.

## Run tests and quality checks

From `project/backend`:

```powershell
npm ci
npm test
npm run test:coverage
npm run lint
npm run format:check
```

The integration tests start a temporary MongoDB process. The first run may
download a MongoDB test binary.

## Move existing tasks to an account

Tasks created before user accounts were added have no owner. They remain hidden
until explicitly assigned. Start the app, create the intended account, stop the
backend, and from `project/backend` run this command using an environment file
whose `MONGODB_URI` points to the same database:

```powershell
npm run migrate:legacy-tasks -- <username>
```

This assigns all ownerless legacy tasks to the named account. Check the username
and database before running it; the command does not guess which account should
own old data.

## User workflow

- Register or sign in with your username and password.
- Create tasks with a title, priority, optional due date, and comma-separated
  tags.
- Search, filter by status/priority, sort, and navigate task pages.
- Use **Edit** for task details or **Done/Undo** for a quick status change.
- Each account sees only tasks it owns. Sign out to end the browser session.
- Signing out invalidates all active sessions for that account; sign in again
  on any device to continue.

## Local environment variables

`backend/.env.example` is the template for running Node.js directly:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task_manager
JWT_SECRET=<set-a-random-value-of-at-least-32-characters>
```

Compose uses the MongoDB service name internally. Set `JWT_SECRET` in a local
`project/.env` to override the demo key if needed.
