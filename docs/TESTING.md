# Testing Guide

## Setup

```bash
cd backend
npm install
npm test
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

## Test Files Structure

```
backend/
├── tests/
│   ├── auth.test.js
│   ├── users.test.js
│   ├── posts.test.js
│   ├── notifications.test.js
│   └── fixtures/
│       └── testData.js
```

## Example Test File

```javascript
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Authentication', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('test@example.com');
    });

    it('should not register duplicate email', async () => {
      await User.create({
        username: 'existing',
        email: 'existing@example.com',
        password: 'password123'
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'existing@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(400);
    });
  });
});
```

## Coverage

Run tests with coverage report:
```bash
npm test -- --coverage
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Setup/Teardown**: Use beforeEach/afterEach for database cleanup
3. **Mocking**: Mock external services (email, storage)
4. **Assertions**: Test both success and error cases
5. **Performance**: Keep tests fast and focused
