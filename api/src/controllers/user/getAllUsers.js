const db = require("../../../database-config");

const getAllUsers = (req, res) => {
    const sql = `SELECT * FROM user INNER JOIN role ON user.uloga_id = role_id AND is_active = "ACTIVE";`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = getAllUsers;