const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
    const { name, lastname, email, password } = req.body;

    const matchedEmail = await User.findOne({ email });
    if (matchedEmail) {
        return res.status(400).json({ message: "Email already exist." });
    }
    const hashedPw = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, lastname, email, password: hashedPw });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    })
    res.status(200).json({ userId: savedUser._id, token });
};

module.exports = { handleRegister }