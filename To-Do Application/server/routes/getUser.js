const express = require("express");
const router = express.Router();
const getUserController = require("../controllers/getUserController");

router.get("/", getUserController.handleUser);
router.get("/loggedUser", getUserController.handleLoggedUser);

module.exports = router