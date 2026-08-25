const productService = require("../services/productService");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const savedProduct = await productService.createProduct(req.body);
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createProduct,
    getProducts
};
