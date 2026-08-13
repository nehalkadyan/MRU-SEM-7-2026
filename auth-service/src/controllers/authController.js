const authService = require("../services/authService");

// signup controller

const signUp = async (req, res) => {
    try {
        // result
        // req.body -> {name : "abc", email : "abc@gmail.com", password : "abc"}
        const result = authService.signup(req.body)

        // return response
        return res.status(201).json({ response: result })
    } catch (err) {
        if (err.message === "User already exists!. Try Login") {
            // 409 -> when user with email is not found.
            return res.status(409).json({ error: err.message })
        } else {
            console.log("err", err.message)
            return res.staus(500).json({ message: "Internal server Error" })
        }
    }
}

// login

const login = (req, res) => {
    try {
        const result = authService.login(req.body);
        return res.status(200).json({ response: result })
    } catch (err) {
        if (err.message === "User not found!") {
            return res.status(404).json({ error: err.message })
        } else {
            return res.status(500).json({ message: "Internal server Error" })
        }

    }
}



module.exports = { signUp, login }