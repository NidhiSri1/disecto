const express = require("express");
const Collection = require("../modules/collectionModule");
const authenticate = require("../middleware/authenticate");
const route = express.Router();
var cookieParser = require("cookie-parser");
const upload = require("../middleware/fileUploads");
route.post("", upload.single("pictures"), async (req, res) => {
    // console.log(req.body.description);
    try {
        var gallery = await Collection.create({
            pictures: req.file.path,
            description: req.body.description,
        });
        let galleryID = gallery.pictures.split("\\");
        let galleryDesp = req.body.description;

        res.send({
            galleryID: galleryID[galleryID.length - 1],
            galleryDesp: galleryDesp,
        });
    } catch (er) {
        console.log(er.message);
        res.send(er.message);
    }
});

route.get("/", async (req, res) => {
    try {
        const collection = await Collection.find({}).lean().exec();
        res.status(200).send(collection);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// route.get("/image/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         res.
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// });

route.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const collection = await Collection.findByIdAndDelete(id).lean().exec();
        res.status(200).send(collection);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = route;
