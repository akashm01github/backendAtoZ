const { nanoid } = require("nanoid");
const urlModel = require("../model/url.model");

const handelGenerateURL = async (req, res) => {
    const { url } = req.body;
    const shortid = nanoid(6);

    await urlModel.create({
        shortID: shortid,
        redirectURL: url,
        visitHistory: [],
        createdBy:req.user._id
    });


    return res.render('home',{shortID:shortid});
}


const redirectURL = async (req, res) => {
    const { shortID } = req.params;

    const entry = await urlModel.findOneAndUpdate({ shortID },{
      $push: {visitHistory:{timeStamp:Date.now()}}
    })

    res.redirect(entry.redirectURL);

}



module.exports = { handelGenerateURL, redirectURL };