const express = require("express");
const { getImage, getImageWithId, insertImage } = require("./db");
const app = express();
const { upload } = require("./s3.js");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const config = require("./config.json");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, `${uid}${path.extname(file.originalname)}`);
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static("public"));

app.get("/images", (req, res) => {
    // We don't use render for this project
    getImage().then(({ rows }) => {
        res.json(rows);
    }).catch((err) => console.log(err));
});

app.get("/image-selected/:imageurl", (req, res) => {
    const { imageurl } = req.params;
    // console.log(req.params.imageurl);
    getImageWithId(imageurl).then(({ rows }) => {
        // console.log(rows);
        res.json(rows);
    }).catch((err) => console.log(err));
});

app.post("/upload", uploader.single("image"), upload, (req, res) => {
    // console.log("req.file: ", req.file);
    const { title, description, username } = req.body;
    const { filename } = req.file;
    const fullUrl = `${config.s3Url}${filename}`;
    if (req.file) {
        // Have to send here the new Object
        insertImage(fullUrl, username, title, description).then(() => {
            // console.log("Inserted to images Table, result: ", result);
            res.redirect("/");
        }).catch((err) => console.log(err));
    } else {
        res.json({
            succes: false
        });
        res.sendStatus(404);
    }
});

app.post("/upload-comments", (req, res) => {
    console.log(req.body);
    // const { comment, username } = req.body;
});

app.listen(8080, () => console.log("Server listening on Port 8080...."));