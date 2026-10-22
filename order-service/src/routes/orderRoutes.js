const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);

// Convenience endpoints matching naming in requirements
router.post("/create-order", createOrder);
router.get("/get-all-orders", getAllOrders);

module.exports = router;
