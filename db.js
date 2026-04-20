const mongoose = require("mongoose");

// Define the mongodb connection url
//const MONGO_URL = 'mongodb://127.0.0.1:27017/hotel'
const uri=process.env.MONGO_URL;

function connectToDB(){
    mongoose.connect(uri)
    .then(() => {
        console.log("Connected successful");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectToDB;






