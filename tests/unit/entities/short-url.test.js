//region [Setup]
const shortUrlInjection = require('../../../src/entities/short-url')
//endregion [Setup]

describe('Entity Short Url', () => {
  const testGeneratedValue = "123qwe"
  const urlCodeGenerator = () => testGeneratedValue
  const testBaseUrl = "http://test.com"

  const Url = shortUrlInjection(urlCodeGenerator, testBaseUrl)

  it('should create a instance of Short Url entity', async () => {
    const testShortUrlObject = {
      originalUrl: "https://en.wikipedia.org/wiki/Main_Page"
    }

    const shortUrl = new Url(testShortUrlObject)

    expect(shortUrl.urlCode).toEqual(testGeneratedValue)
    expect(shortUrl.originalUrl).toEqual(testShortUrlObject.originalUrl)
    expect(shortUrl.shortUrl).toEqual(testBaseUrl + "/" + testGeneratedValue)
  });

  it('should validate inout object', async () => {
    const createObject = () => new Url({})
    expect(createObject).toThrowError()
  });
});
