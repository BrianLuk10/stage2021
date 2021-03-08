const sql = require("./db.js");

// constructor
const Articles = function(articles) {
    this.titre = articles.titre;
    this.description = articles.description;
    this.prix = articles.prix;
    this.prixTotal = articles.prixTotal;
    this.quantite = articles.quantite;
    this.catId = articles.catId;
    this.photo = articles.photo;
};

Articles.findById = (Id, result) => {
    sql.query(`SELECT * FROM articles WHERE id = ${Id}`, (err, res) => {
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

Articles.findByCatId = (Id, result) => {
    sql.query(`select id, titre, don, categorie, articles.catId, prix, prixTotal, quantite from articles
     inner join categories on articles.catId = categories.catId WHERE articles.catId = ${Id}`, (err, res) => {
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


Articles.getAll = result => {
    sql.query("select id, titre, don, categorie, articles.catId, prix, prixTotal, description, quantite from articles inner join categories on articles.catId = categories.catId", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Articles.remove = (id, result) => {
    sql.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Articles;