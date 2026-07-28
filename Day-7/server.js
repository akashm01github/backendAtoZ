const express = require('express');
const connectDB = require('./db/db');
const urlRoute = require('./routes/url.routes');
const urlModel = require('./model/url.model');

const path = require('path');
const staticRoute = require('./routes/static.route');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.set('view engine', "ejs");

app.set('views',path.resolve("./views"));

const PORT = 3000;

//! DATABASE CONNECTION 
connectDB();


//! ROUTES  
app.use('/url', urlRoute);

app.use('/',staticRoute)


app.get('/url/:shortID', async (req, res) => {
    const { shortID } = req.params;

    const entry = await urlModel.findOneAndUpdate({
        shortID
    },

        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            },
        }

    )


    res.redirect(entry.redirectURL);
})



app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`)
})