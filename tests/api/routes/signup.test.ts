import Request from 'supertest';
import app from '../../../api/app';
import { beforeAll, describe, expect, test } from 'vitest';

const route = '/';
const requests = {
  first: () => Request(app).get(route),
};

describe('GET /', () => {
  let responses;
  beforeAll(async () => {
    responses = await Promise.allSettled(Object.values(requests).map(req => req()));
  });

  test('should return 200', async () => {
    const res = responses[0];
    const { body } = res.value;

    expect(body.message).toBe('Hello from the server!');
  });
});