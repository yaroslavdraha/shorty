/**
 * Entity ShortUrl
 * @param urlCodeGenerator - function that generates unique Url code for Short url
 * @param baseUrl - base url(domain) of Short url
 */
module.exports = (urlCodeGenerator, baseUrl) => {
  class ShortUrl {
    constructor({urlCode, originalUrl, shortUrl, date}) {
      if (!originalUrl) {
        throw new Error('Short URL entity must have Original URL')
      }

      /**
       * Required field
       * Represents original URL of client
       */
      this.originalUrl = originalUrl

      /**
       * Optional field
       * Represents unique code of short URL
       */
      this.urlCode = urlCode || urlCodeGenerator()

      /**
       * Optional field
       * Creation data of Short Url
       */
      this.date = date || Date.now

      /**
       * Optional field
       * Generated Short Url
       */
      this.shortUrl = shortUrl || this.__getShortUrl()
    }

    /**
     * Get beautiful formatted data of Short Url generation
     * @returns {string}
     */
    getFormattedDate() {
      return "2020-12-03 Some formatted date..."
    }

    /**
     * Get Short Url based on Base Url and Url code
     * @private
     */
    __getShortUrl() {
      return baseUrl + "/" + this.urlCode;
    }
  }

  return ShortUrl
};
