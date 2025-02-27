const jwt = require("jsonwebtoken");

const handleLogout = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });

    res.status(200).json({ message: "Logout successful" });
};

module.exports = { handleLogout }