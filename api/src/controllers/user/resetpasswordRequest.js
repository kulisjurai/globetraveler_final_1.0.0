const db = require("../../../database-config");
const { sendResetPasswordRequestEmail } = require("../../mail.service");

const resetPasswordRequest = (req, res) => {
    const { identifier } = req.params;
    console.log(req.params);
    const sql = `SELECT * FROM user WHERE username = '${identifier}' OR email = '${identifier}'`;

    db.query(sql, async(err, result) => {
        if (result.length == 0) {
            res
                .status(400)
                .send("Ne postoji korisnik sa ovim email-om ili username-om.");
            return false;
        }

        const url = `${process.env.FRONTEND_APP_URL}/reset-password?username=${result[0].username}`;

        await sendResetPasswordRequestEmail(
            result[0].email,
            result[0].first_name,
            url
        );
        res.json({
            success: true,
        });

        return true;
    });
};

module.exports = resetPasswordRequest;