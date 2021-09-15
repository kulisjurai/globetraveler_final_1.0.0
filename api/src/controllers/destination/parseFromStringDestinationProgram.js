const db = require("../../../database-config");

const parseFromStringDestinationProgram = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT program FROM destination where dest_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
            throw err;
        }
        res.status(200).json(result[0]);
    });
};

module.exports = parseFromStringDestinationProgram;

// ((result) => {
//     var parser = new DOMParser();
//     console.log("result: ");
//     var doc = parser.parseFromString(result, "text/html");
//     console.log("doc: ", doc);

//     res.status(200).json(doc);
// })();