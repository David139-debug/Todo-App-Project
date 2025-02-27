const jwt = require("jsonwebtoken");

const handleLogout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

    res.status(200).json({ message: "Logout successful" });
};

module.exports = { handleLogout }