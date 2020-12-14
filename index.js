const express = require("express");
const { getImage } = require("./db");
const app = express();

app.use(express.static("public"));

app.get("/images", (req, res) => {
    // We don't use render for this project
    getImage().then(({ rows }) => {
        res.json(rows);
    });
});

app.listen(8080, () => console.log("Server listening on Port 8080...."));