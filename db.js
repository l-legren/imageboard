const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

// SELECTING

exports.getImages = () => {
    const q = `SELECT * 
    FROM images
    ORDER BY id DESC
    LIMIT 9`;
    // const params = [lastId];

    return db.query(q);
};

exports.getMoreImages = (lastId) => {
    const q =
        ` SELECT url, title, id, (
            SELECT id FROM images
            ORDER BY id ASC
            LIMIT 1
        ) AS "lowestId" FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 9`;
    const params = [lastId];

    return db.query(q, params);
};

exports.getImageWithId = (id) => {
    const q = `SELECT *
    FROM images
    WHERE id=($1)`;
    const params = [id];

    return db.query(q, params);
};

exports.getComments = (id) => {
    const q = 
        `SELECT *
        FROM comments
        WHERE image_id = ($1)
        LIMIT 3`;
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
        `INSERT INTO comments (comment, username, image_id)
        VALUES ($1, $2, $3)
        RETURNING *`;
    const params = [comment, username, imageId];

    return db.query(q, params);
};