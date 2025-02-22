const User = require("../models/User");

const handleUser = async (req, res) => {
    const id = req.params.id;
    
    try {
            const foundUser = await User.findById(id);
        if (foundUser) {
            res.status(201).json(foundUser);
        } else {
            res.status(401).json({ message: "User not found." });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { handleUser }