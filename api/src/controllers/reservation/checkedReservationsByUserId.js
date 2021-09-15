const db = require("../../../database-config");

const countNotCanceledReservation = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT COUNT(1) AS checkedReserve FROM reservation
                 WHERE is_checked = "TRUE"
                 AND user_id = ?
                 AND reservation_is_active = 'ACTIVE'`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result[0]);
    });
};

module.exports = countNotCanceledReservation;