const mongoose = require("mongoose");

// Define the mongodb connection url
const Mongo_URL = 'mongodb://127.0.0.1:27017/hotel'

// Setup mongodb connection
mongoose.connect(Mongo_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})


// Get the default connection
// mongooose maintains the default connection object representing the mongodb connection
const db = mongoose.connection;


db.on("connected", () => {
    console.log("Connected to mongodb server");
});

db.on("error", (err) => {
    console.log("Mongodb connection error", err);
});

db.on("disconnected", () => {
    console.log("mongodb disconnected");
});

// Exports the database connection
module.exports = db;

