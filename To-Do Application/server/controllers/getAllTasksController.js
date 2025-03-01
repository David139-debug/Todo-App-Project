const Task = require("../models/Task");

const handleAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find();  
        if (allTasks) {
            res.status(200).json(allTasks);
        } else {
            res.status(400).json({ message: "Error occured." });
        }
    } catch (err) {
        res.status(400).json({ message: "Network error." });
    }
};

module.exports = { handleAllTasks }