const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleUser = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh Token not found." });
    }

    if (!accessToken) {
        return res.status(401).json({ message: "Not authorized." });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const foundUser = await User.findById(decoded.id).select("-password");
        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired token." });
    }
};

const handleLoggedUser = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            return res.status(403).json({ message: "Forbidden." });
        }
};

module.exports = { handleUser, handleLoggedUser }