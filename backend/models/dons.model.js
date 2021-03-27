const sql = require("./db.js");

// constructor
const Dons = function(dons) {
    this.id = dons.id;
    this.dons = dons.dons;
};

Dons.create = (newDon, result) => {
    sql.query("INSERT INTO dons SET ?", newDon, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created don: ", { id: res.insertId, ...newDon });
        result(null, { id: res.insertId, ...newDon });
    });
};

Dons.findById = (Id, result) => {
    sql.query(`SELECT * FROM dons WHERE id = ${Id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Dons.findByArtId = (Id, result) => {
    sql.query(`select SUM(dons) as dons from dons where id = ${Id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Dons.updateById = (id, dons, result) => {
    sql.query(
        "UPDATE dons SET dons = ? WHERE id_don = ?",
        [ dons.don, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("updated dons: ", { id: id, ...dons });
            result(null, { id: id, ...dons });
        }
    );
};


Dons.getAll = result => {
    sql.query("select * from dons", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Dons.remove = (id, result) => {
    sql.query("DELETE FROM dons WHERE id_don = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Dons;