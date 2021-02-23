module.exports = app => {
    const categories = require("../controller/categories.controller.js");

    app.get("/categories/:id", categories.findCat);

};