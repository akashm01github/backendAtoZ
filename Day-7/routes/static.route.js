const express = require('express');
const urlModel = require('../model/url.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const allURLs = await urlModel.find({});

    return res.render('home', { urls: allURLs });
})

module.exports = router;


