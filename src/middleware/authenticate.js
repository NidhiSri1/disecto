require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return rej(err);
            } else {
                res(user);
            }
        });
    });
};

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ messgae: "Not authorised" });
    }

    if (!req.headers.authorization.startsWith("Bearer")) {
        return res
            .status(400)
            .send({ messgae: "Authorization token was not provided" });
    }
    const token = req.headers.authorization.split(" ")[1];
    let user;
    try {
        user = await verifyToken(token);
    } catch (err) {
        res.status(400).send({ message: "Token is valid or not provided" });
    }

    req.user = user.user;
    // console.log(req.user);
    next();
};
