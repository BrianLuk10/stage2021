const sql = require("./db.js");

// constructor
const Categories = function(categories) {
    this.catId = categories.catId;
    this.categorie = categories.categorie
};

Categories.findCatById = (Id, result) => {
    sql.query(`SELECT * FROM articles as a, categories as c WHERE a.catId = c.catId and c.catId = ${Id}`, (err, res) => {
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

module.exports = Categories;