const config = require('config');
const shortid = require('shortid');
const shortUrlInjection = require('./short-url')

const Url = shortUrlInjection(shortid.generate, config.get('app.baseUrl'))

module.exports = {
  Url
}
