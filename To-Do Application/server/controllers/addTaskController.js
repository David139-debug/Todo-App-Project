const Task = require("../models/Task");

const handleAddTask = async (req, res) => {
    const data = req.body;
    
    const newTask = new Task({
        name: data.name,
        date: data.date,
        priority: data.priority,
        type: data.type,
        status: data.status,
        backgroundColor: data.backgroundColor,
        status: data.status,
        userId: data.userId,
    });

    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
};

module.exports = { handleAddTask };