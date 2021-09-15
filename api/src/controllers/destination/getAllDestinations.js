const db = require("../../../database-config");

const getAllDestinations = (req, res) => {
    const sql = `SELECT * FROM destination INNER JOIN transport
    ON destination.transport_id = transport.id AND is_active = "ACTIVE";`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = getAllDestinations;