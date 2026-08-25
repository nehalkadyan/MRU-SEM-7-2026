const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
    return res.status(200).json({ message: "OK" });
});

module.exports = app;
