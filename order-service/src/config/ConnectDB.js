const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
        console.log("URI: ", uri);
        await mongoose.connect(uri);
        console.log("Database Connected!");
    } catch (err) {
        console.log("err", err.message);
    }
};

module.exports = connectToDB;
