const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => {
    return res.status(200).json({ message: "OK" });
});

module.exports = app;
