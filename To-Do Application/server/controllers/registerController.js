const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
    const formData = req.body;

    const hashedPw = await bcrypt.hash(formData.password, 10);

    const newUser = new User({
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: hashedPw
    });

    const matchedEmail = await User.findOne({ email: newUser.email });
    if (matchedEmail) {
        return res.status(400).json({ message: "Email already exist." });
    }

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json(savedUser._id);
};

module.exports = { handleRegister }