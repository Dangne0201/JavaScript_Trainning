# JavaScript Training

This repository contains JavaScript exercises and a portfolio-ready full-stack
application: **Personal Task Manager**.

## Featured project

The application demonstrates:

- Username/password registration and login with hashed passwords and HTTP-only
  authentication cookies.
- Per-user task ownership, so users cannot view or modify another user's tasks.
- Task workflows, priorities, due dates, and tags.
- A validated REST API with pagination, search, filtering, and sorting.
- A service/controller/model backend structure, automated API tests, security
  middleware, Docker Compose, and GitHub Actions CI.

### Run the full application

For the local demo, only Git and Docker Desktop are required. Install and start
Docker Desktop, then run these commands in PowerShell:

```powershell
git clone https://github.com/Dangne0201/JavaScript_Trainning.git
cd JavaScript_Trainning\project
docker compose -f docker-compose.yml -f docker-compose.demo.yml up --build
```

Then open <http://localhost:5000> and create an account. No Node.js, `.env`
setup, or separate MongoDB install is needed just to try the app. The demo
signing key is local-only; do not expose the demo setup publicly. These clone
instructions include this version only after the changes are pushed or merged
to GitHub.

To stop, press `Ctrl+C` and optionally run
`docker compose -f docker-compose.yml -f docker-compose.demo.yml down` from
`project/`. Task data persists in a Docker volume.

### Run checks

```powershell
cd project\backend
npm ci
npm run lint
npm run format:check
npm run test:coverage
```

## Project documentation

- [Portfolio project overview and screenshot](project/README.md)
- [Project setup and user guide](project/docs/HUONG_DAN_SU_DUNG.md)
- [Architecture and design](project/docs/GIAI_THICH_DU_AN.md)
- [REST API reference](project/docs/API.md)

To publish a verified Docker image to GitHub Container Registry, push a tag in
the form `task-manager-v1.0.0`. The release workflow runs the quality checks
before publishing; it does not deploy to a cloud host.

The `learning/` directory contains independent practice exercises and is not
required to run the task manager.
