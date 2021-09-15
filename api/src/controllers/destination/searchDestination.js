const db = require("../../../database-config");

const searchDestinations = (req, res) => {
    const { name } = req.params;
    const sql = `SELECT * FROM destination WHERE UCASE (name) LIKE "%${name}%" AND is_active = "ACTIVE" OR UCASE (country) LIKE "%${name}%" AND is_active = "ACTIVE";`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = searchDestinations;