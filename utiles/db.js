const mongoose = require("mongoose");

const URI = "mongodb+srv://thapa:thapa123@cluster0.rbtfn1b.mongodb.net/shortenerDb";

const connectdb = async() => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Connection failed");
        process.exit(0);
    }
}


module.exports = connectdb;