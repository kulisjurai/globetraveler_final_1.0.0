const db = require("../../../database-config");

const getDestinationById = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM destination where dest_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }

        res.status(200).json(result[0]);
    });
};

module.exports = getDestinationById;