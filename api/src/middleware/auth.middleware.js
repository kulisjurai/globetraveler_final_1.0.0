const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const headers = req.headers["authorization"];
    const token = headers && headers.split(" ")[1];

    if (!token) {
        console.log("No token.");
        res.status(401).send("JsonWebToken is missing.");
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res
                    .status(400)
                    .json({ msg: "Vasa sesija je istekla. Morate se ponovno prijaviti" });
                throw err;
            }
            req.user = user;
            next();
        });
    }
};

module.exports = authToken;