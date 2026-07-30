const mongoose = require('mongoose');


const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [
        {
            timeStamp:{ type: Number }
        }
    ]
},{timestamps:true});


const urlModel = mongoose.model("url",urlSchema);


module.exports = urlModel;




