# Project status and next steps

## Current scope

Expense Tracker is a single-user Windows desktop portfolio project. The WinForms app manages expense categories and expenses with SQL Server as persistent storage. Docker Compose provides a repeatable local database; the GUI runs natively on Windows.

## Implemented

- WinForms UI for creating categories and creating, viewing, editing, and deleting expenses.
- Positive amount validation, `DECIMAL(18,2)` range/precision checks, and category-name length validation.
- Parameterized SQL access in `ExpenseRepository`.
- Docker SQL Server setup with persistent volume and initialization from `data/init.sql`.
- Starter categories for a new database without fake expense history.
- Restricted local application login; setup protects its generated password for the current Windows user.
- Database-independent validation tests and separately tagged, local-only integration test.
- Windows GitHub Actions workflow for restore, build, and unit tests.
- Reviewer-oriented setup, demo steps, architecture notes, and documented security limitations.

## Remaining proof before calling it ready to share

- Run the documented setup on a clean Windows profile/VM and record the exact result.
- Run integration tests only against a disposable local Docker database.
- Run the interactive UI smoke test and verify add/edit/cancel/delete behaviors visually.
- Capture an authentic screenshot or short screen recording from the running app.
- Confirm a successful GitHub Actions run before describing CI as green.
- Generate a new, versioned release bundle and test it; do not distribute the historical ZIPs because they contain an old example database credential.

## Deliberate non-goals for this portfolio version

- Multi-user login/authorization: a desktop client connected directly to SQL Server cannot provide a trustworthy per-user security boundary. A future multi-user version needs a server-side service and ownership checks in every read/write operation.
- Web REST API, JWT, CORS, or browser security headers: these do not fit the current native WinForms architecture.
- Category deletion/editing, budgets, charts, and recurring transactions: defer until there is a clear product goal and test plan rather than adding portfolio features by checklist.

## Data safety

The Docker SQL Server volume is persistent. Normal setup does not delete or recreate it, and database initialization is skipped when `ExpenseDb` already exists. Do not run `docker compose down -v` unless you explicitly intend to erase local database data.
