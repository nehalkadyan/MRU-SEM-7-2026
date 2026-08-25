// import mognoose

const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        // uri from .env
        const uri = process.env.DB_URI
        console.log("URI: ", uri)
        // method used to connect using uri
        await mongoose.connect(uri)
        console.log("Database Connected!")
    } catch (err) {
        console.log("err", err.message)
    }
}

module.exports = connectToDB