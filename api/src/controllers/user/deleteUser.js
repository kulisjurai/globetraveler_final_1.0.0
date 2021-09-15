const db = require("../../../database-config");

const deleteUser = (req, res) => {
    console.log(req.params);
    const userId = parseInt(req.params["id"]);

    const sql = `UPDATE user SET
      is_active = 'INACTIVE' WHERE user_id = ${userId}`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json({ msg: "Korisnik je obrisan" });
    });
};

module.exports = deleteUser;