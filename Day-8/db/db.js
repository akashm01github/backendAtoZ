const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/urlShortner')
    .then(()=>{
        console.log('MongoDB is Connected.......')
    })
}


module.exports = connectDB;


