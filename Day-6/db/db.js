const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb://localhost:27017/')
    .then(()=>{
        console.log('MongoDB is Connected..........');
    })
}


module.exports = connectDB;