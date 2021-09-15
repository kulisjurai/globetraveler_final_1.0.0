const db = require("../../../database-config");

const countUsers = (req, res) => {
    const sql = `SELECT COUNT(1) AS numOfUsers FROM user WHERE is_active = "ACTIVE"`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result[0]);
    });
};

module.exports = countUsers;