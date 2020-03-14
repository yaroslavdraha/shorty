//region [Setup]
const {agent} = require('supertest');
const createServer = require('../../../index');
const mongoose = require('mongoose');
const Url = require('../../../models/Url');

let server = createServer();
let request = agent(server);

afterAll(async (done) => {
  server.close(done);
  await cleanUp();
  mongoose.connection.close();
});
//endregion [Setup]

//region [Properties]
const longUrl = 'https://www.youtube.com/watch?v=fZkNQw5bFyU22222';
//endregion

describe('URL shorten generation', () => {
  it('should create a new short URL', async () => {
    let res = await request.post('/api/url/shorten')
      .send({longUrl})
      .expect(200);

    for (let urlProperty in Url.schema.obj) {
      expect(res.body).toHaveProperty(urlProperty);
    }
  });

  it("shouldn't create the same short URL ", async () => {
    let res = await request.post('/api/url/shorten')
      .send({longUrl})
      .expect(200);

    let urlCode = res.body.urlCode;

    expect(urlCode).toBeDefined()
    expect(typeof urlCode === "string").toBe(true)

    const urls = await Url.find({longUrl});

    expect(urls.length).toEqual(1)

  });
});

//region [Clean up]
async function cleanUp() {
  await Url.deleteMany({longUrl});
}
//endregion
