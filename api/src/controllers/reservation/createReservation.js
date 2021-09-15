const db = require("../../../database-config");

const createReservation = async(req, res) => {
    const { user_id, destination_id, payment_type_id, transport_id } = req.body;

    const sql = `INSERT INTO reservation (user_id, destination_id, payment_type_id, transport_id) VALUES(?, ?, ?, ?)`;

    db.query(
        sql, [user_id, destination_id, payment_type_id, transport_id],
        (err, result) => {
            if (err) {
                res.status(500).json(err);
                console.log("message", err);
                return;
            }
            res.status(200).json({ msg: "Uspješna rezervacija." });
        }
    );
};

module.exports = createReservation;