//region [Setup]
const supertest = require('supertest');
const app = require('../../../server');
const Url = require('../../../models/Url');
const connect = require('./../../../providers/database')();

let request = supertest(app);

afterAll(async () => {
  await cleanUp();
});
//endregion [Setup]

//region [Properties]
const longUrl = 'https://www.youtube.com/watch?v=fZkNQw5bFyU';
//endregion

describe('Get original URL', () => {
  it('should get original URL based on URL code', async () => {
    let res = await request.post('/api/url/shorten')
      .send({longUrl})
      .expect(200);

    let {urlCode} = res.body;

    await request.get(`/${urlCode}`)
      .expect('Location', longUrl)
      .expect(302);
  });

  it('should return Not found status for incorrect URL code', async () => {
    const notExistingUrlCode = "66666666666";

    await request.get(`/${notExistingUrlCode}`)
      .expect(404);
  });
});

//region [Clean up]
async function cleanUp() {
  await Url.deleteMany({longUrl});
}
//endregion
