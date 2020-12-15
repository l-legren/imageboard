const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

// SELECTING

module.exports.getImage = () => {
    const q = `SELECT * 
    FROM images`;

    return db.query(q);
};

// INSERTING

exports.insertImage = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description)
    VALUES ($1, $2, $3, $4)`;
    const params = [url, username, title, description];

    return db.query(q, params);
}