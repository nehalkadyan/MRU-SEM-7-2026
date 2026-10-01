const authService = require("../services/authService");

const cookieOptions = {
    httpOnly: true, // prevents client-side JS from reading the cookie
    secure: process.env.NODE_ENV === "production", // ensures cookie is sent over HTTPS in production
    sameSite: "strict", // prevents CSRF attacks
    maxAge: 7 * 60 * 60 * 1000, // 7 hours, matches token expiry
};

// signup controller
const signUp = async (req, res) => {
    try {
        // result
        // req.body -> {name : "abc", email : "abc@gmail.com", password : "abc"}
        const result = await authService.signup(req.body)

        // set cookie
        res.cookie("token", result.token, cookieOptions);

        // return response without token in body
        const { token, ...responseData } = result;
        return res.status(201).json({ response: responseData })
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
const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        // set cookie
        res.cookie("token", result.token, cookieOptions);

        // return response without token in body
        const { token, ...responseData } = result;
        return res.status(200).json({ response: responseData })
    } catch (err) {
        if (err.message === "User not found!") {
            return res.status(404).json({ error: err.message })
        } else {
            return res.status(500).json({ message: "Internal server Error" })
        }
    }
}

// export
module.exports = { signUp, login }