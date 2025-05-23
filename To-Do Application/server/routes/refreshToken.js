const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");

router.post("/", refreshTokenController.refresh);

module.exports = router