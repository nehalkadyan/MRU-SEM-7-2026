require("dotenv").config();
const app = require("./app");
const connectToDB = require("./config/ConnectDB");

const PORT = process.env.PORT || 3004;

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log("Mail service is running on port", PORT);
        });
    } catch (err) {
        console.log("Error connecting with server", err.message);
    }
};

startServer();
