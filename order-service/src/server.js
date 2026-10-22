require("dotenv").config();
const app = require("./app");
const connectToDB = require("./config/ConnectDB");

const PORT = process.env.PORT || 3003;

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    } catch (err) {
        console.log("Error connecting with server", err.message);
    }
};

startServer();
