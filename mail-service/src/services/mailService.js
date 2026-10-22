const Mail = require("../models/Mail");

// In-memory store for received dummy emails
const receivedEmails = [];

// Send dummy mail (no nodemailer or 3rd-party services)
const sendMail = async (data) => {
    const to = data.to || data.userEmail || data.email || "customer@example.com";
    const subject = data.subject || (data.orderId ? `Order Confirmation - #${data.orderId}` : "Order Notification");

    const newMail = new Mail({
        to,
        subject,
        orderId: data.orderId,
        totalAmount: data.totalAmount,
        items: data.items,
        body: data.body || "Your order has been placed successfully!",
        receivedAt: new Date().toISOString()
    });

    receivedEmails.push(newMail);

    // Simulated email delivery output
    console.log("==================================================");
    console.log("📧 [MAIL SERVICE] Dummy Email Dispatched!");
    console.log(`To:          ${newMail.to}`);
    console.log(`Subject:     ${newMail.subject}`);
    console.log(`Order ID:    ${newMail.orderId || "N/A"}`);
    console.log(`Total:       $${newMail.totalAmount !== undefined ? newMail.totalAmount : "N/A"}`);
    console.log(`Items:       ${JSON.stringify(newMail.items, null, 2)}`);
    console.log(`Received At: ${newMail.receivedAt}`);
    console.log("==================================================");

    return newMail;
};

// Retrieve all received dummy emails
const getAllMails = async () => {
    return receivedEmails;
};

module.exports = {
    sendMail,
    getAllMails
};
