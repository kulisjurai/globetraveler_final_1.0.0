const db = require("../../../database-config");

const countReservations = (req, res) => {
    const sql = `SELECT COUNT(1) AS numOfReservations FROM reservation WHERE reservation_is_active = "ACTIVE"`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result[0]);
    });
};

module.exports = countReservations;