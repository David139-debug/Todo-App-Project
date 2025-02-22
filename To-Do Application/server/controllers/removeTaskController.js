const Task = require("../models/Task");

const handleRemoveTask = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            await Task.findByIdAndDelete(id);
            res.status(200).json({ message: "Task deleted." });
        } else {
            return res.status(400).json({ message: "Cannot delete your task." });
        }
    } catch (err) {
        console.error(err);
    }
};


const handleCompleted = async (req, res) => {
    const { taskId } = req.params;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status: "Completed" },
            { new: true }
        );

        if (!updatedTask) {
            res.status(404).json({ message: "Task not found." });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { handleRemoveTask, handleCompleted }