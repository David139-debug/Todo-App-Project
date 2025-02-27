const jwt = require("jsonwebtoken");

const handleLogout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });

    res.status(200).json({ message: "Logout successful" });
};

module.exports = { handleLogout }