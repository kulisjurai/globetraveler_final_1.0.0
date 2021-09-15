const db = require("../../../database-config");

const updateUser = async(req, res) => {
    const { id, username, firstName, lastName, address, telefon } = req.body;
    console.log(id, username, firstName, lastName, address, telefon);

    const sql = `UPDATE user
    SET username = ?, first_name = ?, last_name = ?, address = ?, telefon = ? WHERE user_id = ?`;

    db.query(
        sql, [username, firstName, lastName, address, telefon, id],
        (err, result) => {
            if (err) {
                console.log("err", err);
                if (err.Error == "ER_DUP_ENTRY" || err.errno == 1062) {
                    res
                        .status(400)
                        .json({ msg: "Korisničko ime ili email adresa već postoje" });
                    return;
                } else {
                    if (err.code == "ER_BAD_NULL_ERROR")
                        res.status(500).json({
                            msg: "Neka polja su ostala prazna a moraju biti popunjena",
                        });
                    return;
                }
            }
            res.status(200).json({ msg: "Izmjene su uspješno spremljene" });
        }
    );
};

module.exports = updateUser;