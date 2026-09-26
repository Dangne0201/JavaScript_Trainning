# Testing guide

Run commands from the repository root (the directory containing `ExpenseTracker.sln`).

## Prerequisites

- Windows 10/11
- .NET SDK 10
- Docker Desktop only for integration and smoke tests
- An interactive Windows desktop for UI tests

## Unit tests

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\tests\run-unit-tests.ps1
```

These tests cover database-independent validation and repository checks. The script filters out tests tagged `Category=Integration`, so it cannot accidentally connect to SQL Server.

## Integration tests

Use a disposable local Docker database only:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\tests\run-integration-tests.ps1
```

The script securely prompts for the local SA password, starts SQL Server without force-recreating the container, and initializes `ExpenseDb` only when it does not exist. The integration test is tagged `Category=Integration`, rejects non-local connection targets, inserts category/expense data inside a transaction, and rolls it back. Do not use it for shared or production data.

## UI smoke test

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\tests\run-ui-tests.ps1
```

The script builds the WinForms app and launches it through FlaUI. It needs an interactive desktop and a reachable database because startup currently checks connectivity.

## Full local smoke path

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\tests\smoke-test-remote.ps1
```

This starts Docker, initializes the local database only if missing, creates/verifies the restricted application login, builds the test project, and runs only integration tests. It may add data only inside a rolled-back transaction; it never removes the Docker volume. Use the same SA password already associated with an existing volume.

## Manual QA

- Start Docker and launch the app.
- Add a non-empty category; confirm it appears after loading categories.
- Add a positive expense with a selected category.
- Double-click an expense, change its note, save, and confirm the update persists after reloading.
- Double-click an expense and press Escape; confirm edit mode is cancelled without saving.
- Confirm zero, negative, malformed, more-than-two-decimal, and out-of-range amounts are rejected.
- Load expenses and confirm the total row is shown.
- Delete the new expense and confirm it disappears.
- Stop SQL Server and confirm the app reports a connection problem.

## CI boundary

`.github/workflows/dotnet.yml` restores, builds, and runs database-independent tests on Windows. Integration tests require an isolated SQL Server instance and UI tests require an interactive desktop, so they are deliberately manual.

The desktop client uses a local `ExpenseApp` SQL login restricted to database reader/writer roles. Setup protects its randomly generated password with Windows DPAPI for the current user. Do not reuse this architecture for a shared or production database: a desktop client can still inspect its connection and read/write all rows, and SQL Server is bound to loopback for local demonstration.
