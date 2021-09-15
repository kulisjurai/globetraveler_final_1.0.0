const db = require("../../../database-config");

const filterDestinations = (req, res) => {
    const { query } = req.params;

    const sql = query;

    db.query(sql, [query], (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = filterDestinations;