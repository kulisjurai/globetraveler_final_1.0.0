const db = require("../../../database-config");

const createDestination = async(req, res) => {
    const {
        name,
        country,
        description,
        program,
        broj_dana,
        transport_id,
        price,
        image1,
        image2,
        image3,
    } = req.body;
    console.log(req.body);

    const sql = `INSERT INTO destination (name, country, description, program, broj_dana, transport_id, price, image1, image2, image3) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        sql, [
            name,
            country,
            description,
            program,
            parseInt(broj_dana),
            transport_id,
            price,
            image1,
            image2,
            image3,
        ],
        (err, result) => {
            if (err) {
                res.status(500).json(err);
                console.log("message", err);
                return;
            }
            res.status(200).json({ msg: "Destinacija je uspješno dodana" });
        }
    );
};

module.exports = createDestination;