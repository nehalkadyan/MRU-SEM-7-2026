// require express
const express = require("express");

// initialize app
const app = express()

// parse json data

app.use(express.json())

// exporting the app
module.exports = app