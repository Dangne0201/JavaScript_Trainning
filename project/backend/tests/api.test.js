process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-authentication';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const { createApp } = require('../src/app');
const Task = require('../src/models/Task');
const User = require('../src/models/User');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await Promise.all([Task.deleteMany({}), User.deleteMany({})]);
});

const register = (agent, username = 'sample-user') =>
  agent.post('/api/auth/register').send({
    username,
    password: 'correct-horse-battery',
  });

describe('authentication', () => {
  test('serves health status and clears the authentication cookie on logout', async () => {
    const health = await request(app).get('/api/health');
    expect(health.status).toBe(200);
    expect(health.headers['x-content-type-options']).toBe('nosniff');

    const agent = request.agent(app);
    await register(agent);
    const secondSession = request.agent(app);
    await secondSession.post('/api/auth/login').send({
      username: 'sample-user',
      password: 'correct-horse-battery',
    });
    const logout = await agent.post('/api/auth/logout');
    expect(logout.status).toBe(200);
    expect(logout.headers['set-cookie'][0]).toMatch(/Expires=/i);
    expect((await agent.get('/api/auth/me')).status).toBe(401);
    expect((await secondSession.get('/api/auth/me')).status).toBe(401);
  });

  test('rejects expired signed tokens', async () => {
    const agent = request.agent(app);
    const registration = await register(agent);
    const user = await User.findOne({ username: 'sample-user' });
    const expiredToken = jwt.sign(
      { sub: user.id, ver: 0 },
      process.env.JWT_SECRET,
      { expiresIn: -1 },
    );

    const response = await request(app)
      .get('/api/auth/me')
      .set('Cookie', `token=${expiredToken}`);

    expect(registration.status).toBe(201);
    expect(response.status).toBe(401);
  });

  test('rate limits repeated authentication attempts', async () => {
    const limitedApp = createApp({ authRateLimit: 1 });
    const firstAttempt = await request(limitedApp)
      .post('/api/auth/login')
      .send({ username: 'unknown-user', password: 'a-long-password-12' });
    const secondAttempt = await request(limitedApp)
      .post('/api/auth/login')
      .send({ username: 'unknown-user', password: 'a-long-password-12' });

    expect(firstAttempt.status).toBe(401);
    expect(secondAttempt.status).toBe(429);
  });

  test('registers a user and sets an HTTP-only authentication cookie', async () => {
    const agent = request.agent(app);
    const response = await register(agent);

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(
      expect.objectContaining({ username: 'sample-user' }),
    );
    expect(response.body.data.passwordHash).toBeUndefined();
    expect(response.headers['set-cookie'][0]).toMatch(/HttpOnly/i);
    expect(response.headers['set-cookie'][0]).toMatch(/SameSite=Strict/i);

    const currentUser = await agent.get('/api/auth/me');
    expect(currentUser.status).toBe(200);
    expect(currentUser.body.data.username).toBe('sample-user');

    const storedUser = await User.findOne({ username: 'sample-user' }).select(
      '+passwordHash',
    );
    expect(storedUser.passwordHash).not.toBe('correct-horse-battery');
  });

  test('rejects duplicate usernames and invalid credentials', async () => {
    await register(request.agent(app));
    const duplicate = await register(request.agent(app));
    expect(duplicate.status).toBe(409);

    const invalidLogin = await request(app).post('/api/auth/login').send({
      username: 'sample-user',
      password: 'incorrect-password',
    });
    expect(invalidLogin.status).toBe(401);

    const unauthenticated = await request(app).get('/api/tasks');
    expect(unauthenticated.status).toBe(401);
  });
});

describe('task API', () => {
  test('creates, filters, searches, paginates, sorts, and updates tasks', async () => {
    const agent = request.agent(app);
    await register(agent);

    const first = await agent.post('/api/tasks').send({
      title: 'Prepare portfolio',
      priority: 'high',
      dueDate: '2027-01-15',
      tags: ['Career', 'Project'],
    });
    expect(first.status).toBe(201);
    expect(first.body.data.tags).toEqual(['career', 'project']);

    const second = await agent.post('/api/tasks').send({
      title: 'Read a book',
      status: 'backlog',
    });
    expect(second.status).toBe(201);

    const page = await agent.get(
      '/api/tasks?page=1&limit=1&sortBy=title&order=asc',
    );
    expect(page.status).toBe(200);
    expect(page.body.data).toHaveLength(1);
    expect(page.body.pagination).toEqual({
      page: 1,
      limit: 1,
      total: 2,
      totalPages: 2,
    });
    expect(page.body.data[0].title).toBe('Prepare portfolio');

    const search = await agent.get(
      '/api/tasks?q=portfolio&priority=high&tag=career',
    );
    expect(search.body.data).toHaveLength(1);
    expect(search.body.data[0]._id).toBe(first.body.data._id);

    const updated = await agent
      .patch(`/api/tasks/${first.body.data._id}`)
      .send({ status: 'in_progress', priority: 'medium' });
    expect(updated.status).toBe(200);
    expect(updated.body.data.status).toBe('in_progress');
    expect(updated.body.data.priority).toBe('medium');
  });

  test('validates updates and prevents users from accessing each other’s tasks', async () => {
    const owner = request.agent(app);
    await register(owner);
    const ownershipInjection = await owner.post('/api/tasks').send({
      title: 'Not allowed to set an owner',
      ownerId: new mongoose.Types.ObjectId().toString(),
    });
    expect(ownershipInjection.status).toBe(400);

    const created = await owner
      .post('/api/tasks')
      .send({ title: 'Private task' });

    const invalidUpdate = await owner
      .patch(`/api/tasks/${created.body.data._id}`)
      .send({ status: 'not-a-status' });
    expect(invalidUpdate.status).toBe(400);

    const invalidPage = await owner.get('/api/tasks?page=10001');
    expect(invalidPage.status).toBe(400);

    const otherUser = request.agent(app);
    await register(otherUser, 'another-user');
    expect((await otherUser.get('/api/tasks')).body.data).toHaveLength(0);

    const forbiddenUpdate = await otherUser
      .patch(`/api/tasks/${created.body.data._id}`)
      .send({ title: 'Stolen' });
    expect(forbiddenUpdate.status).toBe(404);

    const forbiddenDelete = await otherUser.delete(
      `/api/tasks/${created.body.data._id}`,
    );
    expect(forbiddenDelete.status).toBe(404);

    const deleted = await owner.delete(`/api/tasks/${created.body.data._id}`);
    expect(deleted.status).toBe(200);
  });
});
