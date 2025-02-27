const express = require("express");
const router = express.Router();
const verifyTokenController = require("../controllers/verifyTokenController");

router.get("/", verifyTokenController.verifyToken);

module.exports = router