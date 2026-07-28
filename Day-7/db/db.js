const mongoose = require('mongoose');


const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/urlShortner')
    .then(()=>{
        console.log('MongoDB is Connnected............')
    })
}


module.exports = connectDB;