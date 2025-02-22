const express = require("express");
const router = express.Router();
const removeTaskController = require("../controllers/removeTaskController");

router.delete("/:id", removeTaskController.handleRemoveTask);
router.put("/:taskId/completed", removeTaskController.handleCompleted);

module.exports = router