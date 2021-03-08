module.exports = app => {
    const articles = require("../controller/articles.controller.js");

    app.get("/articles", articles.findAll);

    app.get("/articles/:id", articles.findOne);

    app.get("/articles/categorie/:id", articles.findCatOne);

    app.delete("/articles/:id", articles.delete);

};