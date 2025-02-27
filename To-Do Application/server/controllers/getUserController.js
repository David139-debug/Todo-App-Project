const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        if (!refreshToken) {
            return res.status(401).json({ message: "Not authorized." });
        }
        const decoded = jwt.decode(refreshToken);
        const foundUser = await User.findById(decoded.id);
        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(401).json({ message: "User not found." });
        }
    } catch (err) {
        console.log(err);
    }
};

const handleLoggedUser = (req, res) => {
    const refreshToken = req.cookies.token;
        if (refreshToken) {
            return res.status(403).json({ message: "Forbidden." });
        }
};

module.exports = { handleUser, handleLoggedUser }