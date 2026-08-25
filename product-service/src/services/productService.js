const Product = require("../models/Product");

const createProduct = async (productData) => {
    const newProduct = new Product({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock
    });
    return await newProduct.save();
};

const getProducts = async () => {
    return await Product.find();
};

const checkAuthServiceHealth = async () => {
    // Calling the auth-service using its container name from docker-compose
    const response = await fetch("http://auth-service:3000/health");
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

module.exports = {
    createProduct,
    getProducts,
    checkAuthServiceHealth
};
