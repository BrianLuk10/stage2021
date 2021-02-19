module.exports = app => {
    const articles = require("../controller/articles.controller.js");


    // Retrieve all Customers
    app.get("/articles", articles.findAll);

    // Retrieve a single Customer with customerId
    app.get("/articles/:id", articles.findOne);

    // Delete a Customer with customerId
    app.delete("/articles/:id", articles.delete);

};