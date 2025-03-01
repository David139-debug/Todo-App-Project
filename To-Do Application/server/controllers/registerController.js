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

    const accessToken = jwt.sign(
                { id: savedUser._id }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: "15m" }
            );
    
            const refreshToken = jwt.sign(
                { id: savedUser._id }, 
                process.env.REFRESH_TOKEN_SECRET, 
                { expiresIn: "7d" }
            );
    
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, 
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false, 
                sameSite: "lax",
                maxAge: 15 * 60 * 1000 
            });
    res.status(200).json({ userId: savedUser._id, refreshToken, accessToken });
};

module.exports = { handleRegister }