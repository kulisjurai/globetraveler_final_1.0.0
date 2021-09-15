const db = require("../../../database-config");

const deleteDestination = (req, res) => {
    const destinationId = parseInt(req.params["id"]);

    const sql = `UPDATE destination SET
      is_active = 'INACTIVE' WHERE dest_id = ${destinationId}`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json({ msg: "Destinacija je obrisana" });
    });
};

module.exports = deleteDestination;