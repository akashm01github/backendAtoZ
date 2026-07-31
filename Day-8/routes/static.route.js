const express = require('express');
const urlModel = require('../model/url.model');


const router = express.Router();


router.get('/',async(req,res)=>{
    if(!req.user){
        return res.redirect('/login')
    }
    else{
        const allURL = await urlModel.find(
            {createdBy:req.user.id}
        );
        res.render('home',{urls:allURL});
    }
    
})
router.get('/signup',async(req,res)=>{
    return res.render("signUp");
})


router.get('/login',async(req,res)=>{
    return res.render("login");
})


module.exports = router;