const db = require("../../../database-config");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../jwt.service");

const loginUser = async(req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    const sql = `SELECT * FROM user WHERE username = ? AND is_active = 'ACTIVE'`;

    db.query(sql, [username], async(err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.status(404).json({ msg: "Korisnik ne postoji" });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(500).json({ msg: "Pogrešan password" });
        }
        delete user.password;
        const token = generateAccessToken(user);

        res.status(200).json({ token, user });
    });
};

module.exports = loginUser;