const mongoose = require('mongoose');

const urlEntity = {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {type: String, default: Date.now}
};

const urlSchema = new mongoose.Schema(urlEntity);

module.exports = mongoose.model('Url', urlSchema);
