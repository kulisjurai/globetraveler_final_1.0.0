const db = require("../../../database-config");

const cancelReservation = (req, res) => {
    const reservationId = parseInt(req.params.id);

    const sql = `UPDATE reservation SET
      reservation_is_canceled = 'TRUE' WHERE res_id = ${reservationId}`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json({ msg: "Rezervacija je obrisana" });
    });
};

module.exports = cancelReservation;