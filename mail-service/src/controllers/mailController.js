const mailService = require("../services/mailService");
const os = require("os");

// Dummy API to receive order data and simulate sending email
const sendMail = async (req, res) => {
    try {
        console.log(`[Mail Service] POST /api/mail/send request served by container ID: ${os.hostname()}`);
        const mail = await mailService.sendMail(req.body);
        res.status(200).json({
            message: "Dummy email dispatched successfully",
            mail
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all received dummy emails
const getAllMails = async (req, res) => {
    try {
        console.log(`[Mail Service] GET /api/mail request served by container ID: ${os.hostname()}`);
        const mails = await mailService.getAllMails();
        res.status(200).json(mails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendMail,
    getAllMails
};
