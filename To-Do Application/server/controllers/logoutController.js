const handleLogout = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.status(200).json({ message: "Logout successful" });
};

module.exports = { handleLogout }