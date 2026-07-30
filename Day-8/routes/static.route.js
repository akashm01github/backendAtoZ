const express = require('express');
const urlModel = require('../model/url.model');


const router = express.Router();


router.get('/',async(req,res)=>{
    const allURL = await urlModel.find({});
    res.render('home',{urls:allURL});
})


module.exports = router;