const sql = require("./db.js");

// constructor
const Articles = function (articles) {
    this.titre = articles.titre;
    this.description = articles.description;
    this.prix = articles.prix;
    this.prixTotal = articles.prixTotal;
    this.quantite = articles.quantite;
    this.catId = articles.catId;
    this.photo = articles.photo;
};

Articles.findById = (Id, result) => {
    sql.query(`select articles.id, photo, titre, prix, prixTotal, quantite, categorie, SUM(dons.dons) AS don from dons inner join articles
    on dons.id = articles.id inner join categories on categories.catId = articles.catId where articles.id = ${Id} group by articles.id`, (err, res) => {
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
    sql.query(`select articles.id, articles.catId, titre, prix, prixTotal, quantite, categorie, SUM(dons.dons) AS don 
    from dons inner join articles on dons.id = articles.id inner join categories on categories.catId = articles.catId
     where articles.catId = ${Id} group by articles.id`, (err, res) => {
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
        [article.don, id],
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
    sql.query("select articles.id, titre, prix, prixTotal, quantite, categorie, SUM(dons.dons) AS don from dons inner join articles on dons.id = articles.id inner join categories on categories.catId = articles.catId group by articles.id having SUM(dons.dons) < articles.prixTotal", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Articles.getPrixAll = result => {
    sql.query("select prix, prixTotal, SUM(dons.dons) AS don from dons inner join articles on dons.id = articles.id inner join categories on categories.catId = articles.catId group by articles.id", (err, res) => {
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