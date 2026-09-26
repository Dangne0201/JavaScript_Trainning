/** @jest-environment jsdom */

const fs = require('fs');
const path = require('path');

const frontendPath = path.resolve(__dirname, '../../../frontend');
const html = fs.readFileSync(path.join(frontendPath, 'index.html'), 'utf8');
const appScript = fs.readFileSync(path.join(frontendPath, 'app.js'), 'utf8');
const jsonResponse = (status, data) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: () => 'application/json' },
  json: async () => data,
});

const waitForUi = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await Promise.resolve();
};

beforeAll(async () => {
  const body = html.match(/<body>([\s\S]*?)<\/body>/i)[1];
  document.body.innerHTML = body;
  window.fetch = jest
    .fn()
    .mockResolvedValueOnce(
      jsonResponse(401, { message: 'Authentication required' }),
    );
  window.eval(appScript);
  await waitForUi();
});

afterAll(() => {
  delete window.fetch;
});

test('registration, task errors, and date-only rendering work in a western timezone', async () => {
  window.fetch
    .mockResolvedValueOnce(
      jsonResponse(201, {
        data: { id: 'user-1', username: 'demo-user' },
      }),
    )
    .mockResolvedValueOnce(
      jsonResponse(200, {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      }),
    );

  document.querySelector('#auth-toggle').click();
  document.querySelector('#username').value = 'demo-user';
  document.querySelector('#password').value = 'correct-horse-battery';
  document
    .querySelector('#auth-form')
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  await waitForUi();

  expect(document.querySelector('#task-app').hidden).toBe(false);
  expect(document.querySelector('#username-label').textContent).toContain(
    'demo-user',
  );

  window.fetch.mockResolvedValueOnce(
    jsonResponse(400, { message: 'Title is required' }),
  );
  document.querySelector('#task-title').value = 'A new task';
  document
    .querySelector('#task-form')
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  await waitForUi();

  expect(document.querySelector('#message').textContent).toBe(
    'Title is required',
  );
  expect(document.querySelector('#task-title').value).toBe('A new task');
  expect(document.querySelector('#message').classList.contains('success')).toBe(
    false,
  );

  window.fetch.mockResolvedValueOnce(
    jsonResponse(200, {
      data: [
        {
          _id: 'task-1',
          title: 'Date check',
          status: 'todo',
          priority: 'medium',
          dueDate: '2027-01-15T00:00:00.000Z',
          tags: [],
        },
      ],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
    }),
  );
  document
    .querySelector('#filter-form')
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  await waitForUi();

  const expectedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date('2027-01-15T00:00:00.000Z'));
  const shiftedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeZone: 'America/Los_Angeles',
  }).format(new Date('2027-01-15T00:00:00.000Z'));

  expect(shiftedDate).not.toBe(expectedDate);
  expect(document.querySelector('.task-metadata').textContent).toContain(
    expectedDate,
  );
});
