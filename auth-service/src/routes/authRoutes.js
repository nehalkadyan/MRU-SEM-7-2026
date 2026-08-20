const express = require("express")
// import controllers
const authController = require("../controllers/authController")

// router

const router = express.Router()

router.post("/signup", authController.signUp)
router.post("/signin", authController.login)


module.exports = router