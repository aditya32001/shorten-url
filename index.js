const express = require("express");
const connectdb = require("./utiles/db");
const path = require("path");
const urlRoute = require("./Routes/url");
const staticRoute = require("./Routes/staticRouters");
const URL = require("./models/url");

const PORT = 8001;

const app = express();
//EJs Engine
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

//middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routes
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitedHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl);
});


connectdb().then(
    app.listen(PORT, () => {
        console.log(`Server Started at PORT: ${PORT}`)
    })
)