const db = require("../../../database-config");

const getTrasportTypes = (req, res) => {
    const sql = `SELECT * FROM transport`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = getTrasportTypes;