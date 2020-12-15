const express = require("express");
const { getImage } = require("./db");
const app = express();
const { upload } = require("./s3.js");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (re, file, callback) {
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
    });
});

app.post("/upload", uploader.single("image"), upload, (req, res) => {
    if (req.file) {
        // Have to send here the new Object
        res.json({
            succes: true
        });
    } else {
        res.json({
            succes: false
        });
    }
});

app.listen(8080, () => console.log("Server listening on Port 8080...."));