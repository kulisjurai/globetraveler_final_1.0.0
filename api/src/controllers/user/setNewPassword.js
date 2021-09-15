const db = require("../../../database-config");
const bcrypt = require("bcrypt");

const setNewPassword = async(req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const sql = `UPDATE user
    SET password = ? WHERE username = ?`;

    db.query(sql, [passwordHash, username], (err, result) => {
        if (err) {
            res.status(500).json(err);
            console.log("message", err);
            return;
        }
        res.status(200).json({ msg: "Pormjena passworda-a je uspješna." });
    });
};

module.exports = setNewPassword;