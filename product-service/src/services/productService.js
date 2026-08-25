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



module.exports = {
    createProduct,
    getProducts,
    checkAuthServiceHealth
};
