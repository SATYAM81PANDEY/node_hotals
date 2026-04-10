const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },

    work: {
        type: String,
        enume: ["chef", "waiter", "manager"],
        required: true
    },

    mobile: {
        type: Number
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String
    },

    salery: {
        type:Number,
        required: true
    }
});

const personModel = mongoose.model("person", personSchema);

module.exports = personModel;