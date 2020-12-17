const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

// SELECTING

exports.getImage = () => {
    const q = `SELECT * 
    FROM images`;

    return db.query(q);
};

exports.getImageWithId = (id) => {
    const q = `SELECT *
    FROM images
    WHERE id=($1)`;
    const params = [id];

    return db.query(q, params);
};

// INSERTING

exports.insertImage = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description)
    VALUES ($1, $2, $3, $4)`;
    const params = [url, username, title, description];

    return db.query(q, params);
};

exports.insertComment = (comment, username, imageId) => {
    const q = 
        `INSERT INTO comments (comment, username, imageId)
        VALUES ($1, $2, $3)`;
    const params = [comment, username, imageId];

    return db.query(q, params);
};