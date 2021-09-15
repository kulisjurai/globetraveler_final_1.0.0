const db = require("../../../database-config");

const changeRoleUser = (req, res) => {
    const { user_id } = req.body;
    const role_id = parseInt(req.params["id"]);

    const sql = `UPDATE user SET
      uloga_id = ? WHERE user_id = ${user_id}`;

    db.query(sql, [parseInt(role_id)], (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json({ msg: "Uloga je promjenjena" });
    });
};

module.exports = changeRoleUser;