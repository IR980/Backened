const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://mohammadirshad9163_db_user:5X2KNK0RHutSRtJq@cluster0.iqqgrbf.mongodb.net/halley");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;