const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

router.post("/shorten", async (req, res) => {
  const {longUrl} = req.body;
  const baseUrl = config.get('app.baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json('Invalid base Url');
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json('Invalid post Url');
  }

  // Create Url code
  const urlCode = shortid.generate();

  try {
    let url = await Url.findOne({longUrl});

    if (url) {
      return res.json(url);
    } else {
      const shortUrl = baseUrl + "/" + urlCode;

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
      });
    }

    await url.save();

    return res.json(url);
  } catch (e) {
    console.log(`Server error: ${e}`)
  }
});

module.exports = router;
