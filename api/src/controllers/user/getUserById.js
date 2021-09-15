const db = require("../../../database-config");

const getUserById = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const sql = `SELECT * FROM user where user_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result[0]);
    });
};

module.exports = getUserById;