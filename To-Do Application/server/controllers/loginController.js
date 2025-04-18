const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({ message: "Password or email are incorrect." });
        }

        const isMatched = await bcrypt.compare(password, foundUser.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Password or email are incorrect." });
        }

        const accessToken = jwt.sign(
            { id: foundUser._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "10s" }
        );

        const refreshToken = jwt.sign(
            { id: foundUser._id }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: "7d" }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 10 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true, 
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.status(200).json({ userId: foundUser._id, refreshToken, accessToken });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { handleLogin };
