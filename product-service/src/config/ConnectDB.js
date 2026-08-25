const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        const uri = process.env.DB_URI;
        console.log("URI: ", uri);
        await mongoose.connect(uri);
        console.log("Database Connected!");
    } catch (err) {
        console.log("err", err.message);
    }
};

module.exports = connectToDB;
