const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        trim: true
    },
    items: {
        type: [orderItemSchema],
        default: []
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "PROCESSING", "COMPLETED", "CANCELLED"],
        default: "CONFIRMED"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
