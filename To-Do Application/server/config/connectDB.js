const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;