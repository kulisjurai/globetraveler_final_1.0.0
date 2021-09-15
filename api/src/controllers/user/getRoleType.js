const db = require("../../../database-config");

const getRoleType = (req, res) => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = getRoleType;