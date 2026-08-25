require("dotenv").config();
const app = require("./app");
const connectToDB = require("./config/ConnectDB");

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(process.env.PORT, () => {
            console.log("Server is running on port", process.env.PORT);
        });
    } catch (err) {
        console.log("Error connecting with server", err.message);
    }
};

startServer();
