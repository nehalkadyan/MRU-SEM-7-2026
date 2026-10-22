const express = require("express");
const mailRoutes = require("./routes/mailRoutes");

const app = express();

app.use(express.json());

app.use("/api/mail", mailRoutes);

app.get("/health", (req, res) => {
    return res.status(200).json({ message: "OK" });
});

module.exports = app;
