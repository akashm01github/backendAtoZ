const express = require('express');
const { handelGenerateURL, redirectURL } = require('../controller/url.controller');

const router = express.Router();

router.post('/',handelGenerateURL);

router.get('/:shortID',redirectURL)

module.exports = router;

