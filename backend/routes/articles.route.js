module.exports = app => {
    const articles = require("../controller/articles.controller.js");

    app.get("/articles", articles.findAll);

    app.get("/articles/:id", articles.findOne);

    app.delete("/articles/:id", articles.delete);

};