const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },

    lastname: {
        type: String,
        minLength: 5,
        required: true
    },

    email: {
        type: String,
        required: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
    },

    password: {
        type: String,
        minLength: 5,
        required: true
    },
})

module.exports = mongoose.model("User", UserSchema);