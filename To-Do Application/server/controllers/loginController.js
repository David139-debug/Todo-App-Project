const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const data = req.body;
    const foundUser = await User.findOne({ email: data.email });
    if (!foundUser) {
        return res.status(400).json({ message: "Password or email are incorrect." });
    }
    const isMatched = await bcrypt.compare(data.password, foundUser.password);
    if (!isMatched) {
        return res.status(400).json({ message: "Password or email are incorrect." });
    }
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ userId: foundUser._id, token });
};

module.exports = { handleLogin }