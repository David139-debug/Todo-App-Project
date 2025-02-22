const express = require("express");
const router = express.Router();
const getUserController = require("../controllers/getUserController");

router.get("/:id", getUserController.handleUser);

module.exports = router