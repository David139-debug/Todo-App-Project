const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    name: {
        type: String,
        required: true
    },

    date: {
        type: Date
    },

    priority: {
        type: String,
        enum: ["High", "Low"],
        default: "Low"
    },

    type: {
        type: String,
        enum: ["Daily", "Work", "Personal", "Projects"]
    },

    backgroundColor: {
        type: String
    },

    userId: {
        type: String
    },

    status: {
        type: String,
        enum: ["Pending", "Completed"]
    }
});

module.exports = mongoose.model("Task", TaskSchema);