const Task = require("../models/Task");

const handleAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find();
        const formattedTasks = allTasks.forEach(task => {
        })
        
        if (allTasks) {
            res.status(200).json(allTasks);
        } else {
            res.status(400).json({ message: "Error occured." });
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = { handleAllTasks }