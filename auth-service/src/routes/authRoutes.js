const express = require("express")
// import controllers
const authController = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware");

// router

const router = express.Router()

router.post("/signup", authController.signUp)
router.post("/signin", authController.login)
router.get("/verify", authMiddleware, (req, res) => res.status(200).send("OK"))


module.exports = router