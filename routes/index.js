const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

/**
 * @route GET /:code
 * @desc Redirect to long/original URL
 */
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({urlCode: req.params.code});

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL found')
    }
  } catch (e) {
    console.log(e);
    res.status(500).message(`Server error: ${e.message}`);
  }
});


module.exports = router;
