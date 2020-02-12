//region [Setup]
const {agent} = require('supertest');
const createServer = require('../../../index');
const mongoose = require('mongoose');

const server = createServer();
const request = agent(server);

afterAll(done => {
  server.close(done);
  mongoose.connection.close();
});
//endregion [Setup]

describe('URL shorten generation', () => {
  it('should create a new short URL', async () => {
    await request.post('/api/url/shorten')
      .send({
        "longUrl": "https://www.youtube.com/watch?v=fZkNQw5bFyU22222"
      })
      .expect(200);
  });
});
