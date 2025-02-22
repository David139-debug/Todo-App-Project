const express = require("express");
const router = express.Router();
const getAllTasksController = require("../controllers/getAllTasksController");

router.get("/", getAllTasksController.handleAllTasks);

module.exports = router