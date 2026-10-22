const Order = require("../models/Order");

const MAIL_SERVICE_URL = process.env.MAIL_SERVICE_URL || "http://localhost:3004/api/mail/send";

// Create a new order and notify dummy mail service
const createOrder = async (orderData) => {
    // Calculate total amount if not explicitly provided
    let totalAmount = orderData.totalAmount;
    if (totalAmount === undefined || totalAmount === null) {
        if (Array.isArray(orderData.items) && orderData.items.length > 0) {
            totalAmount = orderData.items.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
        } else {
            totalAmount = 0;
        }
    }

    const newOrder = new Order({
        userEmail: orderData.userEmail || orderData.email,
        items: orderData.items || [],
        totalAmount,
        status: orderData.status || "CONFIRMED"
    });

    const savedOrder = await newOrder.save();

    // Forward order data to dummy mail-service (no nodemailer or 3rd-party services)
    try {
        const mailPayload = {
            to: savedOrder.userEmail,
            subject: `Order Confirmation - #${savedOrder._id}`,
            orderId: savedOrder._id,
            totalAmount: savedOrder.totalAmount,
            items: savedOrder.items,
            status: savedOrder.status,
            createdAt: savedOrder.createdAt
        };

        const response = await fetch(MAIL_SERVICE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mailPayload)
        });

        if (response.ok) {
            const mailRes = await response.json().catch(() => null);
            console.log("[Order Service] Order data forwarded to Mail Service successfully:", mailRes);
        } else {
            console.warn(`[Order Service] Mail service responded with status ${response.status}`);
        }
    } catch (mailError) {
        console.warn("[Order Service] Failed to reach mail service:", mailError.message);
    }

    return savedOrder;
};

// Get all orders
const getAllOrders = async () => {
    return await Order.find();
};

module.exports = {
    createOrder,
    getAllOrders
};
