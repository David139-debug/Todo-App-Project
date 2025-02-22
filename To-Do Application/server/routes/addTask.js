const express = require("express");
const router = express.Router();
const addTaskController = require("../controllers/addTaskController");

router.post("/", addTaskController.handleAddTask);

module.exports = router