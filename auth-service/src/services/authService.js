const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// generate token

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7h" })
    return token
}

// signup

const signup = async ({ name, email, password }) => {
    try {
        // check whether user exists

        const user = await User.findOne({ email })
        // is user already exists
        if (user) {
            throw new Error("User already exists!. Try Login")
        }
        // hash password
        const hashedPass = await bcrypt.hash(password, 10)
        // create new user

        const newUser = await User.create({
            name,
            email,
            password: hashedPass
        })
        // generate token
        const token = generateToken(newUser._id)

        return {
            user: {
                name: newUser.name,
                email: newUser.email,
                id: newUser._id
            },
            token,
            message: "User signed up successfully!"
        }
    } catch (err) {
        console.log("error signing up", err.message)
    }
}

// login

const login = async ({ email, password }) => {
    try {
        // fetch user from db
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new Error("User not found!")
        }
        //validate password
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            throw new Error("Invalid password!")
        }
        // generate token
        const token = generateToken(existingUser._id)
        // response
        return {
            user: {
                name: existingUser.name,
                email: existingUser.email,
                id: existingUser._id
            },
            token,
            message: "User logged in successfully!"
        }
    }
    catch (err) {
        console.log("error logging in", err.message)
    }
}

module.exports = { signup, login, generateToken }
