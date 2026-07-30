const express = require('express');
const urlRoute = require('./routes/url.route');
const connectDB = require('./db/db');
const staticRoute = require('./routes/static.route');
const ejs = require('ejs');

const path = require("path");



const app = express();

app.use(express.json());
app.use(express.urlencoded());


//! SET UP EJS

app.set("view engine","ejs");
app.set("views", path.resolve('./views'))



//! CALL DB
connectDB();


//! ROUTES 
app.use('/url',urlRoute);

//STATIC ROUTE
app.use('/',staticRoute) 


app.listen(3000,()=>{
    console.log('Server is Running On PORT:3000........')
})