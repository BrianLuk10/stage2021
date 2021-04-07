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
    sql.query(`select id, titre, don, categorie, articles.catId, prix, prixTotal, description, quantite, photo from articles inner join categories on articles.catId = categories.catId where id = ${Id}`, (err, res) => {
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

Articles.updateById = (id, article, result) => {
    sql.query(
        "UPDATE articles SET don = ? WHERE cat_id = ?",
        [ article.don, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("updated article: ", { id: id, ...article });
            result(null, { id: id, ...article });
        }
    );
};


Articles.getAll = result => {
    sql.query("select articles.id, titre, prix, prixTotal, quantite, categorie, photo, SUM(dons.dons) AS don from dons inner join articles on dons.id = articles.id inner join categories on categories.catId = articles.catId group by articles.id", (err, res) => {
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