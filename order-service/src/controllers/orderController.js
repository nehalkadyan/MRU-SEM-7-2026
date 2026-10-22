const orderService = require("../services/orderService");
const os = require("os");

// Create a new order
const createOrder = async (req, res) => {
    try {
        const savedOrder = await orderService.createOrder(req.body);
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        console.log(`[Order Service] GET /orders request served by container ID: ${os.hostname()}`);
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders
};
