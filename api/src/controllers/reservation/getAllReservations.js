const db = require("../../../database-config");

const getAllReservations = (req, res) => {
    const sql = `SELECT * FROM reservation
    INNER JOIN user ON reservation.user_id = user.user_id
    INNER JOIN destination ON reservation.destination_id = destination.dest_id
    INNER JOIN type ON reservation.type_id = type.id
    INNER JOIN payment_type ON reservation.payment_type_id = payment_type.id
    INNER JOIN transport ON reservation.transport_id = transport.id
    AND reservation_is_active = 'ACTIVE'`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = getAllReservations;