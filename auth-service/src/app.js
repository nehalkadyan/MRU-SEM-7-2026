// require express
const express = require("express");
// import routes
const authRoutes = require("./routes/authRoutes")


// initialize app
const app = express()

// parse json data

app.use(express.json())

app.use("/api/auth", authRoutes);

// health-check endpoint

app.get("/health", (req, res) => {
    return res.status(200).json({ message: "OK" })
})

// exporting the app
module.exports = app

