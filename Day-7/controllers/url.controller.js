const { nanoid } = require("nanoid");
const urlModel = require("../model/url.model");

async function handleGenerateShortURL(req, res) {

    const body = req.body;

    if (!body.url) {
        return res.status(401).json({
            message: "No URL Found! URL required."
        })
    }

    const shortID = nanoid(8);


    await urlModel.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.render('home', { id: shortID })
}


async function handleGetAnalytics(req, res) {
    const { shortID } = req.params;

    console.log(shortID)
    const result = await urlModel.findOne({ shortID });

    return res.status(201).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}


module.exports = { handleGenerateShortURL, handleGetAnalytics }