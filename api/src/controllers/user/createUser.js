const db = require("../../../database-config");
const bcrypt = require("bcrypt");
const { sendWelcomeEmail } = require("../../mail.service");

const createUser = async(req, res) => {
    const { username, email, firstName, lastName, address, password, telefon } =
    req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const sql = `INSERT INTO user (username, email, first_name, last_name, address, password, telefon) VALUES(?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        sql, [username, email, firstName, lastName, address, passwordHash, telefon],
        (err, result) => {
            if (err) {
                console.log("err", err);
                if (err.Error == "ER_DUP_ENTRY" || err.errno == 1062) {
                    res
                        .status(400)
                        .json({ msg: "Korisničko ime ili adresa već postoje" });
                    return;
                } else {
                    if (err.code == "ER_BAD_NULL_ERROR")
                        res.status(500).json({
                            msg: "Neka polja su ostala prazna a moraju biti popunjena",
                        });
                    return;
                }
            }
            sendWelcomeEmail(email, firstName);
            res.status(200).json({ msg: "Uspješna registracija." });
        }
    );
};

module.exports = createUser;