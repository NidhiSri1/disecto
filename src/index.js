const express = require("express");
const connect = require("./config/db");
const app = express();
const { register, login } = require("./controllers/authControllers");
const collectionControllers = require("./controllers/collectionControllers");
const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");
const User = require("./modules/userModule");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");

app.use(
    cors({
        allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
        exposedHeaders: ["authorization"], // you can change the headers
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
    })
);
app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

app.post("", register);
app.post("/login", login);
app.get("/alluser", authenticate, async (req, res) => {
    try {
        const allUser = await User.find().lean().exec();
        return res.status(200).send(allUser);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

app.use("/collection", collectionControllers);

app.use("/static", express.static("src/uploads"));

app.listen("4000", async () => {
    try {
        await connect();
    } catch (err) {
        console.log(err.message);
    }
    console.log("Listining to port 4000");
});
