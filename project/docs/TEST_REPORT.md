# Test Execution Report

## 1. Test information

| Item                   | Details                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Project                | Personal Task Manager                                                                   |
| Test type              | API integration, frontend interaction, security/authorization checks, Docker smoke test |
| Execution date         | 2026-09-26                                                                              |
| Application under test | Current working-tree implementation                                                     |
| API test tool          | Jest, Supertest, MongoDB Memory Server                                                  |
| Browser test           | Jest + jsdom and manual Chromium smoke test                                             |
| Result                 | **PASS**                                                                                |

## 2. Test environment

- Windows development environment
- Node.js 24.21.0
- Express API and MongoDB 8 in Docker Compose for the smoke test
- In-memory MongoDB for automated API integration tests
- Chrome-compatible browser at `http://localhost:5000`

## 3. Automated test cases

| Test ID | Area                         | Test steps / scenario                                                                        | Expected result                                                                                                | Actual result                             | Status |
| ------- | ---------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------ |
| AUTH-01 | Health/security headers      | Request `GET /api/health`; inspect security response header                                  | HTTP 200 and `X-Content-Type-Options: nosniff`                                                                 | HTTP 200; expected header present         | PASS   |
| AUTH-02 | Registration/session         | Register a valid user; check response, cookie, `/api/auth/me`, and stored password           | HTTP 201; safe user response; HttpOnly/SameSite cookie; authenticated user returned; stored password is a hash | All assertions passed                     | PASS   |
| AUTH-03 | Duplicate registration       | Register the same username twice                                                             | Second registration returns HTTP 409                                                                           | HTTP 409 asserted                         | PASS   |
| AUTH-04 | Invalid login                | Submit an incorrect password                                                                 | HTTP 401 with generic credential error                                                                         | HTTP 401 asserted                         | PASS   |
| AUTH-05 | Authentication required      | Request tasks without a valid login cookie                                                   | HTTP 401                                                                                                       | HTTP 401 asserted                         | PASS   |
| AUTH-06 | Logout/session revocation    | Open two sessions; log out from one; call `/api/auth/me` in both                             | Cookie cleared and all tokens issued before logout are rejected                                                | Both sessions returned HTTP 401           | PASS   |
| AUTH-07 | Expired token                | Sign an already-expired token and request `/api/auth/me`                                     | HTTP 401                                                                                                       | HTTP 401 asserted                         | PASS   |
| AUTH-08 | Login rate limit             | With an isolated limit of one attempt, submit two invalid logins                             | First request returns 401; second returns 429                                                                  | 401 followed by 429                       | PASS   |
| TASK-01 | Create and validate fields   | Create task with priority, due date, and mixed-case tags                                     | HTTP 201; task returned; tags normalized                                                                       | HTTP 201; tags stored lowercase           | PASS   |
| TASK-02 | List/search/filter/sort/page | Create two tasks; request one sorted page; search and filter by priority/tag                 | Only matching data returned; correct ordering and pagination totals                                            | All data and pagination assertions passed | PASS   |
| TASK-03 | Partial update               | PATCH status and priority                                                                    | HTTP 200; selected fields updated                                                                              | HTTP 200; fields matched requested values | PASS   |
| TASK-04 | Input validation             | Send unsupported ownership field, invalid status, and page above max                         | Each invalid request returns HTTP 400                                                                          | All three HTTP 400 assertions passed      | PASS   |
| TASK-05 | Authorization boundary       | Create task as user A; list/update/delete as user B                                          | B sees no task and cannot update/delete it                                                                     | Empty list and HTTP 404 for update/delete | PASS   |
| TASK-06 | Delete                       | Delete an owned task                                                                         | HTTP 200 and success response                                                                                  | HTTP 200 asserted                         | PASS   |
| UI-01   | Registration and API error   | Register via the browser UI, then submit a task and receive a simulated API validation error | Dashboard appears; UI displays the server error and preserves the title                                        | Jest/jsdom assertions passed              | PASS   |
| UI-02   | Date-only timezone rendering | Render a date-only due date in a western timezone                                            | The calendar day remains January 15 rather than shifting to January 14                                         | Jest/jsdom assertion passed               | PASS   |

API cases are implemented in
[`backend/tests/api.test.js`](../backend/tests/api.test.js); browser UI cases
are in [`backend/tests/frontend/app.test.js`](../backend/tests/frontend/app.test.js).
Multiple report rows can be assertions within one Jest test function.

## 4. Manual smoke tests

| Test ID    | Test steps                                                                                  | Expected result                                                           | Actual result                                                                              | Status |
| ---------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------ |
| SMOKE-01   | Start app and database with the explicit local-demo Compose override; request `/api/health` | Both containers start; MongoDB becomes healthy; API responds successfully | App and DB started; health endpoint returned `{"success":true,"message":"API is running"}` | PASS   |
| SEC-01     | Start the base Compose configuration without `JWT_SECRET`                                   | App refuses to start and logs a clear configuration error                 | Container logged `JWT_SECRET must be configured with at least 32 characters` and exited    | PASS   |
| BROWSER-01 | Open app, switch to registration, create a user                                             | Authenticated task dashboard appears                                      | Dashboard appeared with account name and task/filter controls                              | PASS   |
| BROWSER-02 | Create task with title and tags                                                             | Task appears with status, priority, and tags                              | Task appeared in the list with `#portfolio #demo` tags                                     | PASS   |

The local smoke-test Compose stack and its temporary database volume were
stopped and removed after verification.

## 5. Execution summary

| Metric                               | Result                               |
| ------------------------------------ | ------------------------------------ |
| Automated Jest tests                 | 8 passed, 0 failed                   |
| Automated API integration tests      | 7 passed, 0 failed                   |
| Automated frontend interaction tests | 1 passed, 0 failed                   |
| Manual smoke tests                   | 4 passed, 0 failed                   |
| Backend line coverage                | 93.27%                               |
| Backend statement coverage           | 92.37%                               |
| Backend branch coverage              | 78.31%                               |
| Backend function coverage            | 89.74%                               |
| Dependency audit                     | 0 known vulnerabilities at execution |
| Open defects observed                | 0                                    |

Backend coverage is generated by `npm run test:coverage`; detailed HTML output is
available locally at
[`backend/coverage/lcov-report/index.html`](../backend/coverage/lcov-report/index.html).
Generated coverage files are git-ignored and are not committed; rerun the
command to recreate them.

## 6. Scope and limitations

- The report records the test run performed for this change; it is not a claim
  of exhaustive testing across browsers, operating systems, load, or deployment
  environments.
- The automated API suite verifies API behavior and ownership using a temporary
  MongoDB instance. Frontend tests use jsdom and cover registration state, API
  error display, and date-only rendering, not every browser or visual state.
  Manual browser checks cover the main sign-up and task-create flow.
- Rate-limit exhaustion, password reset, account deletion, and production
  deployment are outside this run.
