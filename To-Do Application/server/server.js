const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const PORT = 5000;
const corsOptions = {
    origin: ["http://localhost:5173", "https://lambent-cuchufli-b15fe2.netlify.app/"]
}

require("dotenv").config();
connectDB();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/getUser", require("./routes/getUser"));

app.use("/addTask", require("./routes/addTask"));
app.use("/removeTask", require("./routes/removeTask"));
app.use("/getAllTasks", require("./routes/getAllTasks"));

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
});