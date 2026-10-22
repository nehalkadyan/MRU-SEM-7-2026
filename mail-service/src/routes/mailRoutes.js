const express = require("express");
const { sendMail, getAllMails } = require("../controllers/mailController");

const router = express.Router();

router.post("/send", sendMail);
router.post("/", sendMail);
router.get("/", getAllMails);

module.exports = router;
