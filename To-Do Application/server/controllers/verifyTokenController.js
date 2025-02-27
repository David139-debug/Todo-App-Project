const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ authenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.status(401).json({ authenticated: true });
    } catch (err) {
        return res.status(401).json({ authenticated: false });
    }
};

module.exports = { verifyToken }