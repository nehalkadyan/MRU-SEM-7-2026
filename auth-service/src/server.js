// enable dotenv
const dotenv = require("dotenv").config();
// import app
const app = require("./app");

// import connectDB

const connectToDB = require("./config/ConnectDB");

// function to start server

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(process.env.PORT, () => {
            console.log("Server is running on port", process.env.PORT)
        })
    } catch (err) {
        console.log("err connecting with server", err.message)
    }
}

startServer()