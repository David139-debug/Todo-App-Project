const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleUser = async (req, res) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(401).json({ message: "Not authorized." });
        }
        const decoded = jwt.decode(token);
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
    const token = req.cookies.token;
        if (token) {
            return res.status(403).json({ message: "Forbidden." });
        }
};

module.exports = { handleUser, handleLoggedUser }