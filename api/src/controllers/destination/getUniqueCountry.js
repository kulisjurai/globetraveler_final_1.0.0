const db = require("../../../database-config");

const getUniqueCountry = (req, res) => {
    const sql = `SELECT DISTINCT country
    FROM destination WHERE is_active = "ACTIVE"`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = getUniqueCountry;