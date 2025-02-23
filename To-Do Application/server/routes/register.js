const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router.post("/", registerController.handleRegister);

router.get("/", (req, res) => {
    res.send("Register route is working!");
});
module.exports = router