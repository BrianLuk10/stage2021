module.exports = app => {
    const dons = require("../controller/dons.controller.js");

    app.post("/dons", dons.create);

    app.get("/dons", dons.findAll);

    app.get("/dons/:id", dons.findOne);

    app.get("/dons/articles/:id", dons.findArtOne);

    app.delete("/dons/:id", dons.delete);

};