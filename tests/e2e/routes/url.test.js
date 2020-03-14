//region [Setup]
const supertest = require('supertest');
const app = require('../../../server');
const Url = require('../../../models/Url');
const connect = require('./../../../providers/database')();

let request = supertest(app);

afterAll(async () => {
  await Url.deleteMany({longUrl});
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
    await request.post('/api/url/shorten')
      .send({longUrl})
      .expect(200);

    const urls = await Url.find({longUrl});
    expect(urls.length).toEqual(1);
  });
});
