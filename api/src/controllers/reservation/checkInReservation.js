const db = require("../../../database-config");

const checkInReservation = (req, res) => {
    const reservationId = parseInt(req.params.id);

    const sql = `UPDATE reservation SET
      is_checked = 'TRUE' WHERE res_id = ${reservationId}`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json({ msg: "Check-in uspješan! Želimo Vam sretan put" });
    });
};

module.exports = checkInReservation;