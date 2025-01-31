const shortid = require("shortid")
const URL = require("../models/url");

const handleGenerateNewShortURL = async(req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" })
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitedHistory: []
    })
    return res.render("home", {
        id: shortID
    })
}

const handleGetAnalytics = async(req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({ totalClicks: result.visitedHistory.length, visitedHistory: result.visitedHistory })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}